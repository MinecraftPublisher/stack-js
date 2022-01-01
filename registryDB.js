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
# prep

func quit
exit
end quit

func fileprompt
prompt Enter a file name to edit (or "$$exit" to quit): 
input filename
write %{memread filename}
if fileinput exit-cmd quit 
end fileprompt

func save
echo thing: %{memread fileinput}
write %{echo %{memread filename}} %{echo %{read %{memread filename}}}\\n%{memread fileinput}
end save

func edit
existsnot filename fileprompt
prompt Enter a line to append (or "$$exit" to quit): 
input fileinput
if fileinput exit-cmd quit
ifnot fileinput exit-cmd save
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
