#!/bin/bash
mkdir -p database
cd database

# Download MongoDB for macOS ARM64
echo "Downloading MongoDB..."
curl -O https://fastdl.mongodb.org/osx/mongodb-macos-arm64-7.0.5.tgz

# Extract
echo "Extracting..."
tar -zxvf mongodb-macos-arm64-7.0.5.tgz

# Renaissance naming
mv mongodb-macos-arm64-7.0.5 mongodb

# Create data directory
mkdir -p data/db

# Create startup script
cat <<EOT > start_db.sh
#!/bin/bash
./mongodb/bin/mongod --dbpath data/db --port 27017
EOT

chmod +x start_db.sh

echo "Setup complete. Run ./database/start_db.sh to start the database."
