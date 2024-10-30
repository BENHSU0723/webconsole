cd frontend
yarn install
yarn build
rm -rf ../public
cp -R build ../public
cd ..