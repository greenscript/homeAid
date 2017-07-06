#/bin/bash
emojis=( 👩‍👦 👪 🏡 🏆 👧🏽 👨 🍽 🐺 🐱)
num_emojis=${#emojis[*]}


echo "
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]} ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}
      ${emojis[$((RANDOM%num_emojis))]}           ${emojis[$((RANDOM%num_emojis))]}

      "

echo "Hello Developer! Welcome to Home Aid. -greenscript"
echo "Select an option: start(runs the project), install(installs dependencies))"
#read in user input into the action variable

read action

# if action is copy then continue proceed with the following
if [ $action = "start" ]
then
  echo "opening browser, when npm starts finishes it will refresh, in some cases :v"
  open "http://localhost:4200/"
  echo "running npm start... please wait."
  npm start
  exit 1
fi

if [ $action = "install" ]
then
  echo "Deleting old dependencies and lock..."
  rm -rf node_modules
  rm -rf yarn.lock
  echo "running yarn"
  yarn
  echo "opening browser, when npm starts finishes it will refresh, in some cases :v"
  open "http://localhost:4200/"
  echo "running npm start... please wait."
  npm start
  exit 1
fi
