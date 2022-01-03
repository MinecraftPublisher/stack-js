export const registryDB = {
  "default.st": `// an empty StackScript program.
echo empty`,
  "edit.st": `# the default editor

# prep
memwrite edit-func-exit-cmd $$exit
memwrite edit-func-should-write write
memwrite edit-func-should-notexists notexists
# prep

func edit-func-fileprompt
prompt Enter a file name to edit: 
input edit-func-filename
write %{memread edit-func-filename} 
hex fff
typewriter 10 Got it! If you want to close the program, Please type "$$exit" and press enter to close at any time.
end edit-func-fileprompt

func edit-func-check
jscontext edit-func-read_output
this.filesystem[this.memory["edit-func-filename"].startsWith('/') ? this.memory["edit-func-filename"] : path + this.memory["edit-func-filename"]].content ? this.filesystem[this.memory["edit-func-filename"].startsWith('/') ? this.memory["edit-func-filename"] : path + this.memory["edit-func-filename"]].content + "\\n" : ""
end edit-func-read_output
write %{memread edit-func-filename} %{memread edit-func-read_output}%{memread edit-func-fileinput}
edit
end edit-func-check

func edit
existsnot edit-func-filename edit-func-fileprompt
hex fff
prompt ..  
input edit-func-fileinput
jscontext edit-func-js_input
stack.filesystem[stack.memory["edit-func-filename"].startsWith('/') ? stack.memory["edit-func-filename"] : stack.path + stack.memory["edit-func-filename"]] ? "write" : "notexists"
end edit-func-js_input

ifnot edit-func-fileinput edit-func-exit-cmd edit-func-check
end edit`,
  "boot.st": `
echo [MSG_BOOT_DROP_SYSTEM]
hex fc447b
typewriter 60 StackOS
sleep 200
hex 54fff3
typewriter 50 Instant boot operating system
sleep 800
hex 3dff9e
module edit
module devsh
sleep 200
typewriter 50 Loading devshell...
sleep 800
hex
devsh`,
  "devsh.st": `# devshell
func devsh
prompt <span style="color: #ffbf49;">devsh <span style="color: #3debff;">%{memread path}</span></span><span style="color: #ff4949;"> ❯ </span>
input term-input
run %{memread term-input}
devsh
end devsh`
};
export default registryDB;
