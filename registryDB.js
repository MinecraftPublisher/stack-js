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

  'boot.st': `echo error: no boot procedure specified, try uncommenting the line below:
// module devsh`,

  'devsh.st': `// devshell
echo DevShell

func devsh
prompt devsh ❯ 
input term-input
run %{memread term-input}
devsh
end devsh

devsh`,
};

export default registryDB;
