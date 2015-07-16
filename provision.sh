#!/bin/bash
#
# provision.sh
#
# This file is specified in Vagrantfile and is loaded by Vagrant as the primary
# provisioning script whenever the commands `vagrant up`, `vagrant provision`,
# or `vagrant reload` are used. It provides all of the default packages.

echo "### Updating system..."
sudo apt-get update

echo "### Install needed tools..."
sudo apt-get install git -y
sudo apt-get install curl -y
sudo apt-get install vim -y
sudo apt-get install g++ -y
sudo apt-get install ruby -y
sudo apt-get install rubygems -y

echo "### Install nodejs..."
sudo apt-get install python-software-properties -y
sudo add-apt-repository ppa:chris-lea/node.js -y
sudo apt-get update
sudo apt-get install nodejs -y

echo "### Update npm to latest version..."
sudo npm update npm -g

# echo "### Updating node to v.0.12.4 to fix bower's error..."
# sudo npm cache clean -f
# sudo npm install -g n
# sudo n stable
# node -v

# echo "### Install nodejs..."
# echo "Install the PPA..."
# curl -sL https://deb.nodesource.com/setup | sudo bash -

# echo "Install nodejs..."
# sudo apt-get install nodejs -y

# echo "Install build-essentials package..."
# sudo apt-get install build-essential

# echo "Updating node to v.0.12.4 to fix bower's error..."
# sudo npm cache clean -f
# sudo npm install -g n
# sudo n stable
# node -v

# echo "Update npm to latest version..."
# sudo npm update npm -g

echo "### Install backend..."

echo "### Install mongodb..."
echo "Import the public key used by the package management system..."
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

echo "Create a list file for MongoDB..."
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/mongodb.list

echo "Reload local package database..."
sudo apt-get update

echo "Install the MongoDB packages: 2.6.1..."
sudo apt-get install mongodb-org=2.6.1 mongodb-org-server=2.6.1 mongodb-org-shell=2.6.1 mongodb-org-mongos=2.6.1 mongodb-org-tools=2.6.1 -y

echo "Pin a specific version of MongoDB..."
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# echo "### Fix bower error..."
# sudo npm install -g --unsafe-perm yo

echo "### Install keystonejs generator..."
sudo npm install -g generator-keystone

#  (user@keystonejs.com) admin