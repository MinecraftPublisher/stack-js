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

func pluglands-key-w
# go forward
end pluglands-key-w
func pluglands-key-a
# go left
end pluglands-key-a
func pluglands-key-s
# go backward
end pluglands-key-s
func pluglands-key-d
# go right
end pluglands-key-d

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

jscontext world_name
JSON.parse(this.filesystem["/pluglands-game-data"].content)["world"]
end world_name

jscontext room_name
JSON.parse(this.filesystem["/pluglands-game-data"].content)["room"].toString()
end room_name

jscontext server_data
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://pluglands.phazor.ir/worlds/?mode=fetch_world&world=" + this.memory["world_name"], false );
xmlHttp.send( null );
xmlHttp.responseText;
end server_data

jscontext room_data
JSON.stringify(JSON.parse(this.memory["server_data"])["rooms"][this.memory["room_name"]])
end room_data

jscontext cell-slot-1-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,0"]?.id]
end cell-slot-1-line-1
jscontext cell-slot-2-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,1"]?.id]
end cell-slot-2-line-1
jscontext cell-slot-3-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,2"]?.id]
end cell-slot-3-line-1
jscontext cell-slot-4-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,3"]?.id]
end cell-slot-4-line-1
jscontext cell-slot-5-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,4"]?.id]
end cell-slot-5-line-1
jscontext cell-slot-6-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,5"]?.id]
end cell-slot-6-line-1
jscontext cell-slot-7-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,6"]?.id]
end cell-slot-7-line-1
jscontext cell-slot-8-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,7"]?.id]
end cell-slot-8-line-1
jscontext cell-slot-9-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,8"]?.id]
end cell-slot-9-line-1
jscontext cell-slot-10-line-1
this.memory["cell-" + JSON.parse(this.memory["room_data"])["0,9"]?.id]
end cell-slot-10-line-1
jscontext cell-slot-1-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,0"]?.id]
end cell-slot-1-line-2
jscontext cell-slot-2-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,1"]?.id]
end cell-slot-2-line-2
jscontext cell-slot-3-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,2"]?.id]
end cell-slot-3-line-2
jscontext cell-slot-4-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,3"]?.id]
end cell-slot-4-line-2
jscontext cell-slot-5-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,4"]?.id]
end cell-slot-5-line-2
jscontext cell-slot-6-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,5"]?.id]
end cell-slot-6-line-2
jscontext cell-slot-7-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,6"]?.id]
end cell-slot-7-line-2
jscontext cell-slot-8-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,7"]?.id]
end cell-slot-8-line-2
jscontext cell-slot-9-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,8"]?.id]
end cell-slot-9-line-2
jscontext cell-slot-10-line-2
this.memory["cell-" + JSON.parse(this.memory["room_data"])["1,9"]?.id]
end cell-slot-10-line-2
jscontext cell-slot-1-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,0"]?.id]
end cell-slot-1-line-3
jscontext cell-slot-2-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,1"]?.id]
end cell-slot-2-line-3
jscontext cell-slot-3-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,2"]?.id]
end cell-slot-3-line-3
jscontext cell-slot-4-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,3"]?.id]
end cell-slot-4-line-3
jscontext cell-slot-5-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,4"]?.id]
end cell-slot-5-line-3
jscontext cell-slot-6-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,5"]?.id]
end cell-slot-6-line-3
jscontext cell-slot-7-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,6"]?.id]
end cell-slot-7-line-3
jscontext cell-slot-8-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,7"]?.id]
end cell-slot-8-line-3
jscontext cell-slot-9-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,8"]?.id]
end cell-slot-9-line-3
jscontext cell-slot-10-line-3
this.memory["cell-" + JSON.parse(this.memory["room_data"])["2,9"]?.id]
end cell-slot-10-line-3
jscontext cell-slot-1-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,0"]?.id]
end cell-slot-1-line-4
jscontext cell-slot-2-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,1"]?.id]
end cell-slot-2-line-4
jscontext cell-slot-3-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,2"]?.id]
end cell-slot-3-line-4
jscontext cell-slot-4-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,3"]?.id]
end cell-slot-4-line-4
jscontext cell-slot-5-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,4"]?.id]
end cell-slot-5-line-4
jscontext cell-slot-6-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,5"]?.id]
end cell-slot-6-line-4
jscontext cell-slot-7-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,6"]?.id]
end cell-slot-7-line-4
jscontext cell-slot-8-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,7"]?.id]
end cell-slot-8-line-4
jscontext cell-slot-9-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,8"]?.id]
end cell-slot-9-line-4
jscontext cell-slot-10-line-4
this.memory["cell-" + JSON.parse(this.memory["room_data"])["3,9"]?.id]
end cell-slot-10-line-4
jscontext cell-slot-1-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,0"]?.id]
end cell-slot-1-line-5
jscontext cell-slot-2-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,1"]?.id]
end cell-slot-2-line-5
jscontext cell-slot-3-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,2"]?.id]
end cell-slot-3-line-5
jscontext cell-slot-4-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,3"]?.id]
end cell-slot-4-line-5
jscontext cell-slot-5-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,4"]?.id]
end cell-slot-5-line-5
jscontext cell-slot-6-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,5"]?.id]
end cell-slot-6-line-5
jscontext cell-slot-7-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,6"]?.id]
end cell-slot-7-line-5
jscontext cell-slot-8-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,7"]?.id]
end cell-slot-8-line-5
jscontext cell-slot-9-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,8"]?.id]
end cell-slot-9-line-5
jscontext cell-slot-10-line-5
this.memory["cell-" + JSON.parse(this.memory["room_data"])["4,9"]?.id]
end cell-slot-10-line-5
jscontext cell-slot-1-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,0"]?.id]
end cell-slot-1-line-6
jscontext cell-slot-2-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,1"]?.id]
end cell-slot-2-line-6
jscontext cell-slot-3-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,2"]?.id]
end cell-slot-3-line-6
jscontext cell-slot-4-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,3"]?.id]
end cell-slot-4-line-6
jscontext cell-slot-5-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,4"]?.id]
end cell-slot-5-line-6
jscontext cell-slot-6-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,5"]?.id]
end cell-slot-6-line-6
jscontext cell-slot-7-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,6"]?.id]
end cell-slot-7-line-6
jscontext cell-slot-8-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,7"]?.id]
end cell-slot-8-line-6
jscontext cell-slot-9-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,8"]?.id]
end cell-slot-9-line-6
jscontext cell-slot-10-line-6
this.memory["cell-" + JSON.parse(this.memory["room_data"])["5,9"]?.id]
end cell-slot-10-line-6
jscontext cell-slot-1-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,0"]?.id]
end cell-slot-1-line-7
jscontext cell-slot-2-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,1"]?.id]
end cell-slot-2-line-7
jscontext cell-slot-3-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,2"]?.id]
end cell-slot-3-line-7
jscontext cell-slot-4-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,3"]?.id]
end cell-slot-4-line-7
jscontext cell-slot-5-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,4"]?.id]
end cell-slot-5-line-7
jscontext cell-slot-6-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,5"]?.id]
end cell-slot-6-line-7
jscontext cell-slot-7-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,6"]?.id]
end cell-slot-7-line-7
jscontext cell-slot-8-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,7"]?.id]
end cell-slot-8-line-7
jscontext cell-slot-9-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,8"]?.id]
end cell-slot-9-line-7
jscontext cell-slot-10-line-7
this.memory["cell-" + JSON.parse(this.memory["room_data"])["6,9"]?.id]
end cell-slot-10-line-7
jscontext cell-slot-1-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,0"]?.id]
end cell-slot-1-line-8
jscontext cell-slot-2-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,1"]?.id]
end cell-slot-2-line-8
jscontext cell-slot-3-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,2"]?.id]
end cell-slot-3-line-8
jscontext cell-slot-4-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,3"]?.id]
end cell-slot-4-line-8
jscontext cell-slot-5-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,4"]?.id]
end cell-slot-5-line-8
jscontext cell-slot-6-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,5"]?.id]
end cell-slot-6-line-8
jscontext cell-slot-7-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,6"]?.id]
end cell-slot-7-line-8
jscontext cell-slot-8-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,7"]?.id]
end cell-slot-8-line-8
jscontext cell-slot-9-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,8"]?.id]
end cell-slot-9-line-8
jscontext cell-slot-10-line-8
this.memory["cell-" + JSON.parse(this.memory["room_data"])["7,9"]?.id]
end cell-slot-10-line-8

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
echo 

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
memwrite cell-placeholder https://csb-73i5k.netlify.app/placeholder.png
memwrite cell-empty https://csb-73i5k.netlify.app/empty.png
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
write /pluglands-game-data {"world": "tutorial", "room": "0"}
sleep 1000
pluglands-main
end tutorial