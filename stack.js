/*
 * Stack.js
 * Create a small, Nearly functioning operating system in the web.
 * A filesystem needs to be provided to the system, Otherwise it will not function.
 */
import registryDB from './registryDB.js';

/**
 * @typedef {Object} StackFile
 * @property {string} content - The file content.
 * @property {string} registryname - The name of the function, if present in the registry.
 * @param {boolean} jscontext - Wether to allow Javascript, This is ignored in registered modules.
 */
/**
 * Define the StackFile class.
 *
 * @param {string} filetext - The input file content.
 * @param {string} registryname - The name of the function, if present in the registry.
 * @param {boolean} jscontext - Wether to allow Javascript, This is ignored in registered modules.
 */
export function StackFile(filetext, registryname, jscontext) {
  try {
    this.content = filetext || '';
    this.registryname = registryname || 'default.st';
    this.jscontext = jscontext || registryDB[registryname] === this.content;
  } catch {
    return {};
  }
}

export const sleep = (ms) => {
  for (const past_timestamp = Date.now() + ms; Date.now() !== past_timestamp; );
};

export const registry = registryDB;

/**
 * Make a new StackJS instance.
 *
 * StackJS options:
 *   javascript: boolean - Wether to allow Javascript on all instances by default.
 *   isolated: boolean - Wether to disallow files from using the import statement.
 *
 *
 * @param {object} filesystem - A StackOS filesystem.
 * @param {object} options - Provide various options for the StackOS instance.
 */

export let color = 'ff503d';
export let path = '/';

async function linify(input, model) {
  var line = input;
  for (var match of line.match(/%{[^%{}]+}/) || []) {
    let output = '';
    // run the code with a custom stdout
    await model.execute(
      new StackFile(match.slice(2, match.length - 1)),
      stdin,
      (string) => {
        output += string;
      }
    );
    line = line.replace(match, output);
  }
  if (line.match(/%{[^%{}]+}/)) return linify(line, model);
  else return line;
}

export function stack(filesystem, options) {
  const system = {
    memory: {},
    filesystem: filesystem || {
      '/boot.st': new StackFile(registry['boot.st'], 'boot', true),
    },
    /**
     * Executes a StackScript, And allows javascript context if the file matches the registry.
     *
     * @param {StackFile} fileinput - The file object to execute.
     * @param {function} stdin - A function to provide the user input when called.
     * @param {function} stdout - A function to show a string to the user when called.
     */
    execute: async function (
      fileinput,
      stdin = prompt,
      stdout = window.EmuVBE,
      stdclear = function () {},
      isolated = options?.isolated,
      javascript = options?.javascript
    ) {
      let running = true;
      const code = fileinput.content.split('\n');
      for (var i = 0; i < code.length; i++) {
        var line = await linify(code[i], this);
        this.memory['path'] = path;

        const array = line.split(' ');
        let command = array[0];
        let args = array.slice(1).join(' ');

        if (
          line != '' &&
          line != ' ' &&
          command != '#' &&
          command != '//' &&
          command != 'rem'
        ) {
          switch (command) {
            case 'echo': {
              stdout(args, color);
              break;
            }
            case 'hex': {
              if (args.length <= 1) {
                color = 'ff503d';
              } else {
                color = args;
              }
              break;
            }
            case 'clear': {
              stdclear, isolated, javascript || fileinput.jscontext();
              break;
            }
            case 'prompt': {
              this.memory[`PROMPT[]`] = args;
              break;
            }
            case 'memread': {
              stdout(this.memory[args]);
              break;
            }
            case 'memwrite': {
              this.memory[args.split(' ')[0]] = args
                .split(' ')
                .slice(1)
                .join(' ');
              break;
            }
            case 'run': {
              if (!isolated) {
                await this.execute(
                  new StackFile(args),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'input': {
              this.memory[args] = await stdin(this.memory[`PROMPT[]`]);
              console.log('output sent');
              break;
            }
            case 'sleep': {
              await sleep(parseInt(args));
              break;
            }
            case 'exit': {
              i = code.length + 100000;
              break;
            }

            /* filesystem-related commands */
            case 'read': {
              stdout(
                this.filesystem[args.startsWith('/') ? args : path + args]
                  ?.content || "devsh: couldn't find file " + args
              );
              break;
            }
            case 'write': {
              this.filesystem[
                args.split(' ')[0].startsWith('/')
                  ? args.split(' ')[0]
                  : path + args.split(' ')[0]
              ] = new StackFile(
                args.split(' ').slice(1).join(' ').split('\\n').join('\n')
              );
              break;
            }
            case 'rm': {
              if (!args.startsWith('/')) args = '/' + args;
              if (this.filesystem[args]) this.filesystem[args] = undefined;
            }
            case 'import': {
              if (!isolated) {
                await this.execute(
                  this.filesystem[path + args] ||
                    new StackFile(
                      'echo devsh: couldn\'t find file "' + args + '"'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'module': {
              if (!isolated) {
                await this.execute(
                  new StackFile(registry[args + '.st'], args + '.st', true) ||
                    new StackFile(
                      'echo devsh: couldn\'t find module "' + args + '"'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'unlock': {
              if (javascript || fileinput.jscontext) {
                this.filesystem[
                  args.startsWith('/') ? args : path + args
                ].jscontext = true;
                await this.execute(
                  new StackFile('echo File unlocked.'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile('echo devsh: jscontext is currently locked.'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            /* filesystem-related commands */

            case 'func': {
              this.memory[`FUNCTION[${args}]`] = new StackFile(
                '# function: ' + args,
                fileinput.registryname,
                fileinput.jscontext
              );
              for (++i; code[i] != 'end ' + args; i++)
                this.memory[`FUNCTION[${args}]`].content += '\n' + code[i];
              break;
            }
            case 'jscontext': {
              let jscontextcode = new StackFile(
                '// javascript: ' + args.split('\n').join(' ')
              );
              for (++i; code[i] != 'end ' + args; i++) {
                jscontextcode.content += '\n' + code[i];
              }
              if (javascript || fileinput.jscontext) {
                this.memory[args] = eval(
                  `const stack = {"memory": ${JSON.stringify(
                    this.memory
                  )}, "filesystem": ${JSON.stringify(
                    this.filesystem
                  )}, "path": ${JSON.stringify(path)}}` + jscontextcode.content
                );
              } else {
                await this.execute(
                  new StackFile('echo devsh: jscontext is blocked'),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'if': {
              if (
                this.memory[args.split(' ')[0]] ===
                this.memory[args.split(' ')[1]]
              ) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(' ')[2]}]`] ||
                    new StackFile(
                      'echo devsh: command "' +
                        args.split(' ')[2] +
                        '" not found'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'exists': {
              if (this.memory[args.split(' ')[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(' ')[1]}]`] ||
                    new StackFile(
                      'echo devsh: command "' +
                        args.split(' ')[2] +
                        '" not found'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'existsnot': {
              if (!this.memory[args.split(' ')[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(' ')[1]}]`] ||
                    new StackFile(
                      'echo devsh: command "' +
                        args.split(' ')[2] +
                        '" not found'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            case 'ifnot': {
              if (
                this.memory[args.split(' ')[0]] !==
                this.memory[args.split(' ')[1]]
              ) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(' ')[2]}]`] ||
                    new StackFile(
                      'echo devsh: command "' +
                        args.split(' ')[2] +
                        '" not found'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
              break;
            }
            default: {
              await this.execute(
                this.memory[`FUNCTION[${command}]`] ||
                  new StackFile(
                    'echo devsh: command "' + command + '" not found'
                  ),
                stdin,
                stdout,
                stdclear,
                isolated,
                javascript || fileinput.jscontext
              );
              break;
            }
          }
        }
      }
    },
  };

  return system;
}

export default stack;
