#!/bin/sh
# This is a comment!
rm -rf public
echo prod build started 
#ng build --prod
ng build --prod --aot --build-optimizer true --optimization true && node minify
echo ' ===================== executing  ng run ebooksden:server ====================='
ng run ebooksden:server
echo ' ===================== Preparing public folder to deploy in firebase hositng  ====================='
cp -a functions/dist/ebooksden/. public/
mv public/index.html public/index2.html
echo ' ===================== Public folder created. Ready to deploy  ====================='
echo ' ===================== Initializing firebase deploy  ====================='
cp /Users/thulasiram/angular7/ng7/ebooksden/src/sitemap* public/
firebase deploy
echo ' ===================== Complete deployment  ====================='
