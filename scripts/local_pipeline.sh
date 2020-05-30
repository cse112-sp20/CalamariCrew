#!/bin/bash
echo "This will remove your node_modules, but will reinstall. Continue? (1 or 2)"
select resp in "Yes" "No"; do
    case $resp in
        Yes ) break;;
        No ) exit;;
    esac
done

RED='\033[0;31m';
NO_COLOR='\033[0m';

function onFail {
    echo -e "\n${RED}Pipeline FAILED!!!!!!!${NO_COLOR} Reinstalling dependencies.\n"
    echo -e "npm install\n";
    npm install;
    exit 1;
}

echo -e "rm -rf node_modules\n";
rm -rf node_modules;

echo -e "npm ci\n";
npm ci || onFail;

echo -e "\nnpm run build --if-present\n";
npm run build --if-present || onFail;

echo -e "\nnpm run lint\n";
npm run lint || onFail;

echo -e "\nnpm test\n";
npm test || onFail;

echo -e "\nnpm run code-coverage-check\n";
npm run code-coverage-check || onFail;

echo -e "\nnpm install\n";
npm install;

echo -e "Exiting with Code 0";
exit 0;