# copying the title into the videos downloaded from coursehunters

# !/bin/bash
i=1
for file in /videos/*.mp4;
do read line;
        j=$(printf "lesson%d.mp4" $i );
        mv  -v  "${j}" "${line}";
        i=$((i + 1));
done  < rename.txt


