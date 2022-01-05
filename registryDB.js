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
  "net.st": `# The original implementation of StackNet - A hacking simulation game

func deploy
echo YOU THOUGHT-
end deploy

echo Loading StackNet kit...
sleep 400
echo Launching network services...
sleep 200
echo Executing binary exploits...
sleep 1000
echo Compressing memory...
sleep 200
echo Finalizing...
sleep 1800
echo Clearing unusued slots...
sleep 600
echo Finding a host...
sleep 800
echo Opening ports...
sleep 1600
echo Syncing with the host...
sleep 600
hex ff3f3f
echo The StackNet kit has been loaded. Run <b><i>deploy</i></b> for more info.
sleep 2000
func net-shell
prompt root@stacknet >>> 
input cmd
# parse it here
echo nah bro
net-shell
end net-shell

net-shell`
};
export default registryDB;
