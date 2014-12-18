for FILE in `find . -name "*.coffee"`
do 
      ditto .${FILE/./} ./../coffee${FILE/./}    
    done
