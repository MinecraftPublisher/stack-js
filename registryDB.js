export const registryDB = {
  "default.st": `// an empty StackScript program.
echo -- empty --`,
  "edit.st": `# the default editor

# prep
memwrite edit-func-exit-cmd $$exit
memwrite edit-func-should-write write
memwrite edit-func-should-notexists notexists
memwrite ran-once-measure 1
# prep

func edit-func-fileprompt
prompt Enter a file name to edit: 
input edit-func-filename
run write %{memread edit-func-filename} 
hex fff
echo Got it! If you want to close the editor, Please type "$$exit" and press enter to close at any time.
end edit-func-fileprompt

func edit-func-check
jscontext edit-func-read_output
this.filesystem[this.memory["edit-func-filename"].startsWith('/') ? this.memory["edit-func-filename"] : path + this.memory["edit-func-filename"]] ? this.filesystem[this.memory["edit-func-filename"].startsWith('/') ? this.memory["edit-func-filename"] : path + this.memory["edit-func-filename"]].content + "\\n" : ""
end edit-func-read_output
write %{memread edit-func-filename} %{memread edit-func-read_output}%{memread edit-func-fileinput}
edit
end edit-func-check

func edit-func-sync
memwrite edit-func-filename %{memread func-edit-args}
echo Editing: %{memread func-edit-args}
write %{memread edit-func-filename} %{memread edit-func-read_output}%{memread edit-func-fileinput}
end edit-func-sync

func edit-func-exit
memrm edit-func-filename
end edit-func-exit

func edit
exists func-edit-args edit-func-sync
existsnot edit-func-filename edit-func-fileprompt
hex fff
prompt ..  
input edit-func-fileinput
jscontext edit-func-js_input
stack.filesystem[stack.memory["edit-func-filename"].startsWith('/') ? stack.memory["edit-func-filename"] : stack.path + stack.memory["edit-func-filename"]] ? "write" : "notexists"
end edit-func-js_input

if edit-func-fileinput edit-func-exit-cmd edit-func-exit
ifnot edit-func-fileinput edit-func-exit-cmd edit-func-check
end edit`,
  "boot.st": `
clear
echo [MSG_BOOT_DROP_SYSTEM]
hex fc447b
echo StackOS
sleep 400
hex 54fff3
echo Instant boot operating system
sleep 400
hex 3dff9e
module edit
module devsh
sleep 400
echo Loading devshell...
sleep 1000
hex
devsh`,
  "devsh.st": `# devshell
func devsh
prompt <span style="color: #ffbf49;">devsh <span style="color: #3debff;">%{memread path}</span></span><span style="color: #ff4949;"> ❯ </span>
input term-input
run %{memread term-input}
devsh
end devsh`,
  "plug.st": `
# PlugLands
# Written in StackScript and JavaScript

echo --- PlugLands ---

sleep 200

echo Starting program initialization...
sleep 200

func pluglands-run
echo Booting PlugLands...
sleep 400
unlock pluglands.st
import pluglands.st
echo Done!
pluglands
end pluglands-run

func pluglands-prompt
echo It seems like the game data has either not been downloaded, Or it is not the latest version.
echo To install/update your game, You need to download it from a trusted source.
prompt Would you like to download the game now? (yes/no) 
memwrite yes yes
memwrite no no
input decision
if decision yes pluglands-download
if decision no pluglands-abort
end pluglands-prompt

func pluglands-download
echo Downloading...
jscontext pluglands-file
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://73i5k.csb.app/pluglands/pluglands.st", false );
xmlHttp.send( null );
xmlHttp.responseText;
end pluglands-file
jscontext latest
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://73i5k.csb.app/pluglands/pluglands-version", false );
xmlHttp.send( null );
xmlHttp.responseText;
end latest
echo Download finished! Saving...
write /pluglands.st %{memread pluglands-file}
write /pluglands-version %{memread latest}
pluglands-run
end pluglands-download

func pluglands-abort
echo Aborted.
echo --------------
end pluglands-abort

func pluglands-continue
echo Available installation found!
sleep 200
echo Checking if the installation is the latest version...
memwrite version %{read /pluglands-version}
jscontext latest
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://73i5k.csb.app/pluglands/pluglands-version", false );
xmlHttp.send( null );
xmlHttp.responseText;
end latest
if version latest pluglands-run
ifnot version latest pluglands-prompt
end pluglands-continue





echo Program initialized!
sleep 300
echo Checking for installation...
existsfile /pluglands.st pluglands-continue
existsnotfile /pluglands.st pluglands-prompt


`,
  "code.st": `# The JS editor for StackJS
echo WebEdit - v1`
};
export default registryDB;
