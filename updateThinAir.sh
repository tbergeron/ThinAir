#!/bin/bash

echo ''
echo '###########################################'
echo '########## ThinAir Auto-Updater ###########'
echo '###########################################'
echo ''

echo 'Cleaning temporary cache...'
rm -rf ./temp_ThinAir
echo 'Cloning latest version...'
git clone git://github.com/tbergeron/ThinAir.git temp_ThinAir >/dev/null 2>/dev/null
echo 'Cloning complete!'
cd ./temp_ThinAir

echo 'Checking if latest version is complete...'
if [ -d './libs' ]; then
  echo 'Updating project to latest ThinAir version...'
  rm -rf ../libs
  mv ./libs ..
  rm -rf ../package.json 
  mv ./package.json ..
  cd ..
  rm -rf ./temp_ThinAir
  echo 'Running npm install to install new packages...'
  npm install
  echo 'ThinAir has been successfully updated!'
else
  rm -rf ./temp_ThinAir
  echo 'Something went wrong, ThinAir has not been updated!'
fi

echo ''
echo '###########################################'
echo ''