# PlugLands

func pluglands
echo PlugLands v%{read /pluglands-version}
existsfile /pluglands-game-data load-data-file
existsnotfile /pluglands-game-data tutorial
end pluglands

func pluglands-key-.
# New frame rendering, No need to do anything
end pluglands-key-.

func pluglands-key-
# To handle empty input
end pluglands-key-

func pluglands-key-x
# No need to say anything when closing
end pluglands-key-x

func invalid-key
echo Error: Unknown keybind "%{memread keyinput}"!
end invalid-key

func run-key
run pluglands-key-%{memread keyinput}
end run-key

func render-frame
clear

# run the code necessary to store the cell data in memory
# TODO: Make this section based on server code
jscontext username
JSON.parse(this.filesystem["/pluglands-game-data"].content)["name"]
end username
jscontext world
JSON.parse(this.filesystem["/pluglands-game-data"].content)["world"]
end world
jscontext room
JSON.parse(this.filesystem["/pluglands-game-data"].content)["room"].toString()
end room

# render the lines

# line-1
key <img width=32 height=37 src="%{memread cell-slot-1-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-1}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-1}" class="cell-slot" />
echo
# line-2
key <img width=32 height=37 src="%{memread cell-slot-1-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-2}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-2}" class="cell-slot" />
echo
# line-3
key <img width=32 height=37 src="%{memread cell-slot-1-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-3}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-3}" class="cell-slot" />
echo
# line-4
key <img width=32 height=37 src="%{memread cell-slot-1-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-4}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-4}" class="cell-slot" />
echo
# line-5
key <img width=32 height=37 src="%{memread cell-slot-1-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-5}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-5}" class="cell-slot" />
echo
# line-6
key <img width=32 height=37 src="%{memread cell-slot-1-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-6}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-6}" class="cell-slot" />
echo
# line-7
key <img width=32 height=37 src="%{memread cell-slot-1-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-7}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-7}" class="cell-slot" />
echo
# line-8
key <img width=32 height=37 src="%{memread cell-slot-1-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-2-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-3-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-4-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-5-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-6-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-7-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-8-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-9-line-8}" class="cell-slot" />
key <img width=32 height=37 src="%{memread cell-slot-10-line-8}" class="cell-slot" />

end render-frame

func pluglands-main
setup-keys
setup-icons
existsnot keyinput default
render-frame
exists FUNCTION[pluglands-key-%{memread keyinput}] run-key
existsnot FUNCTION[pluglands-key-%{memread keyinput}] invalid-key
# Prompt user for additional input
prompt 
input keyinput-raw
jscontext keyinput
this.memory["keyinput-raw"][0]
end keyinput
ifnot keyinput exit-key pluglands-main
end pluglands-main



















func setup-icons
memwrite cell-placeholder data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABJCAYAAACNZiAWAAAI+0lEQVR4nO2ce4xcVR3HP79z7r0zszu72330saW0BIqgIWJjQVrbpPKoD4IgaKKJBiMYEPAPTQRN1Bhiov5h4j9WIAgmBqo1RBN88RKFRINEkPK2qNAHLdB97+zM3Mf5+ced2Z2Zne2ugXJhmW8ymZkz95z7/X1/v/M7Z5L7O8Kbh1ybNgV8oLRI3+8s0D65aTh/0Qc3FHZMVF0M0B0Y76ZHxnYBrzX0ywHVdgN4i9JeOjxSY1xLuwGihQgAIbAT+BzwSm2MpnGvO6f/mnYdS6Fj20ndbN3QlUxWEw+gN2eTXk+uGY+UW/4+to5UiG+wgAiyJNPmkCP1WiOU1PjyIn3vAmYA29BmganzT+n+2M5Ti8PjlQTbwChRsAKXndG3kHgAVtBZRzqFNT1e1BOYZPfeifwXf30YYBdwLVBo5blYBNS9IUDMwl6MgOtIvfhqy7gx0PXDC9ecG8XNwWFEKMeOM1blec/qXKUUOs/KPIFR1XnTJ3Ew1G255dExbv7HOKu7PSI3O74fxeqv6vFC34rZdurwNQ8+97IFrqZFhMUEiOofNkLuBdgLjLT0M8DMZ8/sO+sjpxXzk5Vk3iC+FTafUIgSbR9xTlVKVZeH1OuNCJ1y2e4D8/oYoOLg7B6PL52QZzpRrDSbk6gGT4Ju37jGDRSCq+56/EUPuJIGERaaAoZ0Lj9iDasSR9kaCns+feJJ45UEzzZ3ixPlxD6fld02ipyapoFE1KlK7JpCH4AoUdb0eHz/z69x+2MTDBctVdesgFjDlzcUcK2ZpSbO+qLHui5L6EBarDGgn3h4RKzva5dvmJqpCvDTRhEWEsAjDd0ykM8ZuPvyDQx02Thyaq3MS3SEidooYZ6kvoGJiuPSn++nO2+IG1zsWWF0xvHJ9QV2DAVMxjpfJYGTe3x0/szAIFSdEroFQguYjBSjyoulmJsPxLrztGG56/EX6yL4C02BuPY+84tL1+TDRN3O21/i3UO+d9un1unhqdh6Jr1l7FIv3nj/q9z77xl6c0IUz5F1Cj2+8OPNK6jEijHNVJ1TioGhYIXB+TamJOI27gfq+diKoKpISwioKoM5Q5cVrTiVmSjk9LX9yYfK4RUPPvcywJWtwhX6IQAYSzP2kd9/Zu2Ab4RKrOwbDfnqfUebjLQiTMfKVRu7OX9NnokwwbQQEYHACKrNYVr/nihtDXgjoKoERjhSSfjKYxMUvfQekVOqbi6Z1dfI34ylazLDfR45Kzx3NMQ3wua1efaNwlBOuHPrIIfLCX6DN51COVECa2iH2NUMbLeIwnExvj5u6JTBnGX31gEihcHA8LuXy+zaV5q3CoTDRQuO+PptQ7Ky29pv3v8qBQM3BAP8ZyohUKgkSuSaZ6XUbraQJ4+XgYuhzkdVqWoabRWns6uN1/CqAnxtSz8XnlrUS/Yc8g5Nxey6eC2vlBI+f/cRANZ3pWlKROaFer39rYQ6HxFBAKU50dazfT3phdOh8vxIKDd9dDWBJ2y5/QBrA2HLyoBSpJxQX3LeXDuOG7wenysApiJGgFP684bTBgN9/EiFxEFvTvjZ1kEqiWJr82kicnhmeUjgTUXcCrB9fYEdp3Tzl5fKyZ5np/3rt/Qz1GWJYmV/KZ4LJcAzC8/1txu8M1fnKtvW5ZmIYd9o5PcVfbtmhc+dT02R1HZl7TL7cjAewLx3VZC/YetAbm3R5kenI+ucYyJSdj89xZ5npykn6b54ucKrxsrzo6FsX5fn6k29bL5tPxut4eunF2f/+i20D1sO8ABynvBKKeHAREzBN1x2UhebBgKmaru96cgtm5BvhWdMujszAl4t1seqjrHQUYoVkXS7u1zRdnqb2ibHLHPjYXnntyWhI0DWBLJGR4CsCWSNjgBZE8gaHQGyJpA1OgJkTSBrdATImkDW6AiQNYGs0REgawJZoyNA1gSyRkeArAlkjY4AWRPIGh0BsiaQNToCZE0ga3QEyJpA1ugIkDWBrNERIGsCWaMjQNYE3gyo6ux75CDW9Ol2eGPL5t6yqD0trlZEVuZEh3Km2uOLhXeIAKqKZ0QmQscfDlSkr2DzT42n9WDvDAGAwOCOVp2542DlIHAzsMIzxO8IAeoP+tWqZf4FfBcgdss0CdaTXuTSypZYU2NrD74WAPqhDwi8ONEkcmp1gYqttyPqSW8wMOIbCQF6fXGvpcWZZYCx9D30ugJj1/X60UjZebFbHoUgTpWcEfn2k5OUYhcA+EaYSUNguHaZAHgPvVS67bcvTH/h2vevcOe8rw9AnCpOVRXk7VIY0VgcBWAE3TseCbCJuRJgLw9TlfRzCCD90DcG5WIgv+oJzMcPTyfRD87s9d/V61NOVGN9a4jQamC7SwAREVVV8la44pExmY61HXGpXT8v5O8BdnZbEocYpyo/Oat/tkQGjl0a93qxiJGzBtpj3DrRNIILqQBMx5onrYhr7DV7g/oyWP/xw8ADW1d4524oWHfrwapaQXIGcZoWDM8WQL7xBgKoU5WckQVrZRPFlOL5/WOnDOUNNz4xGT4/FYcGjJsrAof5JZvAnADa8P28+0biey9eJRfkDBytOjUCTtGCFSn65pgRUP/NtTFSQBNVsSJasO0JWZHkSDnxWm1MVOn2DM+MhfxoX+kgLZs4a6gkjvXAB4B/LrXKpZ0VAWmCeADYCKzvtiSlBDuUE249e4DR0GEllbZ1AAF1IEVPnJVmT6oinsGNh84/NNN8WkRqJKwIDN/aO3lgJHTTNJ82kQD9wP2kBzUsZteSFvZ2O8Gw1n4egCf87ZLh/DniXPTHkchX0FiRnBUtehInijSe+pAokjPinhgLg7DlLAHnoDcQ++holPxyf/mvQBfNJUkxsBo4m/SghoXgkwrSbiMXs0Tj4dgFoF6NnAMe2txrtx+Kie/YMuBNR44jFceT4xHdBuKGcE9E6DHCjc9MPQxMMP84jUHgbuB7i3DL0b5eS5mrdH3dWEo2q4fTPYOB2Xn5yV2Rgv/0ePTfe49U/wT0kHqjjgRYAVy0yLgFUkPazCJC/g8vHm8YgAd34AFq0jN/FLhpCf0KpJ5sfbUelZMZ/gc4a8VtIPpI8wAAAABJRU5ErkJggg==
memwrite cell-empty data:image/png;base64,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
end setup-icons

func setup-keys
memwrite exit-key x
memwrite render-key .
memwrite up-key w
memwrite left-key a
memwrite down-key s
memwrite right-key d
memwrite interact-key e
memwrite attack-key z
memwrite defend-key g
memwrite inventory-key i
end setup-keys

func load-data-file
# Loads the game data into memory for PlugLands.
key Loading save data
sleep 400
key .
sleep 400
key .
sleep 400
key .
echo
sleep 800
pluglands-main
end load-data-file

func default
memwrite keyinput .
end default

func tutorial
# Initiates a save file and moves the player through a tutorial.
key Starting
sleep 400
key .
sleep 400
key .
sleep 400
key .
echo
sleep 1500
echo Welcome to PlugLands!
sleep 2000
echo I see that you are a first time player, So I will walk you through the game.
sleep 3500
echo PlugLands is a simple multiplayer game where you collect loot, Scavenge for cells and fight with other players!
sleep 2000
key The controls are the usual <b style="color: #55fcb4;">WASD</b>, 
sleep 1000
key But with extra steps. Basically, You have to press <b style="color: #55fcb4;">Enter</b> every time you want to make an input, 
sleep 1000
key Making the game slow paced and more fun!
sleep 800
echo
sleep 200
prompt <span style="color: #55fcb4;">One last thing, What is your name? (you can change this later) </span>
input username
echo That's all, Now begin!
write /pluglands-game-data {"world": "tutorial", "room": 0, "name": "%{memread username}"}
sleep 1000
pluglands-main
end tutorial