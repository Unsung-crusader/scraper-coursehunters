

# for file in *.mp4;
# do read line;
# mv -v "${file}" "${line}";
# done < rename.txt


# extension adding in a folder
# find . -type f -exec bash -c 'mv "$0" "$0.txt"' {} \;

#!/bin/sh
# for file in *.mp4;do
#        num=$(echo "${file}" | sed -E 's/^.*([0-9]+).mp4$/\1/')
#        line=$(grep -E "^${num}\..*$" rename.txt)
#        mv -v "${file}" "${line}"
# done < rename.txt




# copying the title into the videos downloaded from coursehunters

# !/bin/bash
i=1
for file in /videos/*.mp4;
do read line;
        j=$(printf "lesson%d.mp4" $i );
        mv  -v  "${j}" "${line}";
        i=$((i + 1));
done  < rename.txt


