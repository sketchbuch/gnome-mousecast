# =======================================================
# Increase version in both package.json and metadata.json
# =======================================================

# Will exit if no version provided, but no check is made if the format of the version is correct.

if [ -z $1 ]
then
  echo "Unable to continue, no version provided."
  echo "Please provide a version number when running."
  exit 1
fi

FILE_PATH_1=./static/metadata.json
FILE_PATH_2=./package.json

echo "Changing version to: '$1'"

sed -i "s%  \"version-name\":.*%  \"version-name\": \"$1\"%" "$FILE_PATH_1"
sed -i "s%  \"version\":.*%  \"version\": \"$1\"\,%" "$FILE_PATH_2"