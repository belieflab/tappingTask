# load needed packages
library("dplyr")

# clear out the R workspace
rm(list=ls())

# create directories of files to process
folderPath <- getwd()
dataPath <- paste0(folderPath, "/data/")
outputPath <- paste0(folderPath, "/output/")

#obtain subject files contained in data folder
subs <- list.files(path = dataPath, pattern = ".csv$") #file path to folder with participant files

# create data frames for storing long and wide format data
ftLong <- data.frame() 

ftWide <- matrix(0, nrow = length(subs), ncol = 20) # column value reflects number of variables 
ftWide <- as.data.frame(ftWide)
colnames(ftWide) <- c("ID", "handedness", "block1_domHand_RT","block2_nonDomHand_RT","block3_domHand_RT","block4_nonDomHand_RT", "block5_domHand_RT","block6_nonDomHand_RT", "mean_domHand_RT", "mean_nonDomHand_RT", "mean_RT", "block1_domHand_nTaps","block2_nonDomHand_nTaps","block3_domHand_nTaps","block4_nonDomHand_nTaps", "block5_domHand_nTaps","block6_nonDomHand_nTaps", "mean_domHand_nTaps", "mean_nonDomHand_nTaps", "mean_nTaps" ) 

# loop through participants stored in "subs" and process dependent measures
for (i in 1:length(subs)) {
  
  # read in participants data ***Note: Do not change any parameters for loopData or reaction times may be off.
  loopData <- read.csv(paste0(dataPath, subs[i]), header = TRUE, stringsAsFactor=FALSE, na.strings = "NA")
  loopData$rt[loopData$rt=="null"]<-NA # this line is critical
  
  # create an array of indices denoting the onset of tapping blocks 
  blockStart <- which(loopData == '<p style="color:white; font-size:60px;" id="countdown"></p>', arr.ind = TRUE)
  
  # obtain taps within blocks. ***Note: this throws out first tap as it has unrepresented RT***
  block1 <- loopData[(blockStart[1]+2):(blockStart[2]-3),]
  block2 <- loopData[(blockStart[2]+2):(blockStart[3]-3),]
  block3 <- loopData[(blockStart[3]+2):(blockStart[4]-3),]
  block4 <- loopData[(blockStart[4]+2):(blockStart[5]-3),]
  block5 <- loopData[(blockStart[5]+2):(blockStart[6]-3),]
  block6 <- loopData[(blockStart[6]+2):(nrow(loopData)-2),]
  
  # processing wide format dependent measures
  ftWide[i,1]   <- substr(subs[i], 14, 19)          # participant ID ***Note: must be modified for your data code scheme***
  ftWide[i,2]   <- substr(loopData[5,2], 98, 102)   # handedness
  
  ftWide[i,3]   <- mean(as.numeric(block1$rt))      # mean rt block 1 ***Note: participants always start with dominant hand
  ftWide[i,4]   <- mean(as.numeric(block2$rt))      # mean rt block 2 
  ftWide[i,5]   <- mean(as.numeric(block3$rt))      # mean rt block 3 
  ftWide[i,6]   <- mean(as.numeric(block4$rt))      # mean rt block 4 
  ftWide[i,7]   <- mean(as.numeric(block5$rt))      # mean rt block 5 
  ftWide[i,8]   <- mean(as.numeric(block6$rt))      # mean rt block 6
  ftWide[i,9]   <- rowMeans(ftWide[i,c(3,5,7)])     # mean rt for dominant hand
  ftWide[i,10]  <- rowMeans(ftWide[i,c(4,6,8)])     # mean rt for non-dominant hand
  ftWide[i,11]  <- rowMeans(ftWide[i,3:8])          # mean rt across both hands
  
  ftWide[i,12]  <- nrow(block1)                     # number of taps block 1
  ftWide[i,13]  <- nrow(block2)                     # number of taps block 2
  ftWide[i,14]  <- nrow(block3)                     # number of taps block 3
  ftWide[i,15]  <- nrow(block4)                     # number of taps block 4
  ftWide[i,16]  <- nrow(block5)                     # number of taps block 5
  ftWide[i,17]  <- nrow(block6)                     # number of taps block 6
  
  ftWide[i,18]  <- rowMeans(ftWide[i,c(12,14,16)])  # mean number of taps for dominant hand
  ftWide[i,19]  <- rowMeans(ftWide[i,c(13,15,17)])  # mean number of taps for non-dominant hand
  ftWide[i,20]  <- rowMeans(ftWide[i,12:17])        # mean number of taps for both hands
  
  # processing long format data
  block1$block <- "block1"
  block2$block <- "block2"
  block3$block <- "block3"
  block4$block <- "block4"
  block5$block <- "block5"
  block6$block <- "block6"
  
  block1$handedness <- "dom"
  block2$handedness <- "nonDom"
  block3$handedness <- "dom"
  block4$handedness <- "nonDom"
  block5$handedness <- "dom"
  block6$handedness <- "nonDom"
  
  tmpLong <- rbind(block1,block2,block3,block4,block5,block6)
  tmpLong$ID <- substr(subs[i], 14, 19) 
  tmpLong <- select(tmpLong,c(ID, handedness, block, rt))
  ftLong <- rbind(ftLong,tmpLong)
  
}

# write out processed files
write.csv(ftWide, file = paste0(outputPath,  "ftWide_data.csv"))
write.csv(ftLong, file = paste0(outputPath,  "ftLong_data.csv"))
