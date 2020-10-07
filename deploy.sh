#!/bin/bash
echo "building..."
npm run build
echo "archiving..."
cd /Users/frederic/projects/highlight-science-writing/public
tar -czvf highlight-science-writing.tar.gz *
echo "scp..."
scp highlight-science-writing.tar.gz frederic@178.62.74.16:/var/www/html
rm highlight-science-writing.tar.gz

ssh frederic@178.62.74.16 << EOF
cd /var/www/html
tar -xzf "highlight-science-writing.tar.gz"
rm highlight-science-writing.tar.gz