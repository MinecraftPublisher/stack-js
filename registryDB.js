export const registryDB = {
  'default.st': `// an empty StackScript program.
echo empty`,

  'wget.st': `accepts url
// devshell implementation of wget using javascript
// only downloads text

echo Downloading \${input_url}...

jscontext filetext
await (await fetch(stack.input.url)).text()
end filetext

echo Writing file...

jscontext filename
stack.path + stack.input.url.split('/').slice(url.split('/').length - 1)
end filename

write js_filename js_filetext
echo Done writing \${js_filename}`,

  'edit.st': `# the default editor

# prep
memwrite exit-cmd $$exit
memwrite should-write write
memwrite should-notexists notexists
# prep

func fileprompt
prompt Enter a file name to edit: 
input filename
write %{memread filename} 
end fileprompt

func write-function
write %{memread filename} %{read %{memread filename}}\\n%{memread fileinput}
end write-function

func notexists-function
write %{memread filename} %{memread fileinput}
end notexists-function

func edit
existsnot filename fileprompt
prompt Enter a line to append (or "$$exit" to quit): 
input fileinput
jscontext js_input
stack.filesystem[stack.memory["fileinput"]] ? "write" : "notexists"
end js_input
if js_input should-write write-function
if js_input should-notexists notexists-function
ifnot fileinput exit-cmd edit
end edit`,

  'boot.st': `hex fc447b
echo StackOS
sleep 800
hex 3dff9e
echo Loading devshell...
sleep 500
hex
module devsh`,

  'devsh.st': `# devshell
func devsh
prompt <span style="color: #ffbf49;">devsh <span style="color: #3debff;">%{memread path}</span></span><span style="color: #ff4949;"> ❯ </span>
input term-input
run %{memread term-input}
devsh
end devsh

devsh`,
};

export default registryDB;
