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
    this.jscontext = jscontext || false;

    if (registryDB[registryname] === this.content) {
      this.jscontext = true;
    }
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

export function stack(filesystem, options) {
  const system = {
    memory: {},
    filesystem: filesystem || {
      '/boot.st': new StackFile(registry['boot.st']),
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
      const code = fileinput.content.split('\n');
      for (var i = 0; i < code.length; i++) {
        var line = code[i];
        for (var match of line.match(/%{[^%{}]+}/) || []) {
          let output = '';
          // run the code with a custom stdout
          this.execute(
            new StackFile(match.slice(2, match.length - 1)),
            stdin,
            (string) => {
              output += string;
            }
          );
          line = line.replace(match, output);
        }
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
              stdclear();
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
                this.execute(new StackFile(args), stdin, stdout, stdclear);
              } else {
                this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear
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
              ] = new StackFile(args.split(' ').slice(1).join(' '));
              break;
            }
            case 'rm': {
              if (!args.startsWith('/')) args = '/' + args;
              if (this.filesystem[args])
                this.filesystem.splice(this.filesystem.indexOf(args), 1);
            }
            case 'cd': {
              if (args) {
                if (!args.startsWith('/')) args = path + args;
                console.log(args);
                if (args === '.') {
                } else if (args === '..') {
                  let modified = path.split('/');
                  modified.pop();
                  modified.pop();
                  path = modified.join('/') + '/';
                } else if (
                  Object.keys(path.split('/')).filter((filename) =>
                    filename.startsWith(args)
                  ).length >= 1
                ) {
                  if (!args.endsWith('/')) args = args + '/';
                  else if (args.startsWith('/')) path = args;
                  else path += args;
                } else {
                  stdout('devsh: directory not found: ' + args);
                }
              } else {
                path = '/';
              }
              break;
            }
            case 'ls': {
              stdout('--------');
              let wrote = [];
              for (const filename of Object.keys(this.filesystem)) {
                if (filename.split('/').length === path.split('/').length)
                  wrote.push(filename);
                else
                  wrote.push(
                    filename
                      .split('/')
                      .slice(0, path.split('/').length)
                      .join('/') + '/'
                  );
              }
              stdout(wrote.join('\n'));
              stdout('--------');

              break;
            }
            case 'import': {
              if (!isolated) {
                this.execute(
                  this.filesystem[path + args] ||
                    new StackFile(
                      'echo devsh: couldn\'t find file "' + args + '"'
                    ),
                  stdin,
                  stdout,
                  stdclear
                );
              } else {
                this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear
                );
              }
              break;
            }
            case 'module': {
              if (!isolated) {
                this.execute(
                  new StackFile(registry[args + '.st'], args + '.st', true) ||
                    new StackFile(
                      'echo devsh: couldn\'t find module "' + args + '"'
                    ),
                  stdin,
                  stdout,
                  stdclear
                );
              } else {
                this.execute(
                  new StackFile('echo devsh: program is isolated'),
                  stdin,
                  stdout,
                  stdclear
                );
              }
              break;
            }
            /* filesystem-related commands */

            case 'func': {
              this.memory[`FUNCTION[${args}]`] = new StackFile(
                '# function: ' + args
              );
              for (++i; code[i] != 'end ' + args; i++)
                this.memory[`FUNCTION[${args}]`].content += '\n' + code[i];
              break;
            }
            case 'jscontext': {
              let jscontextcode = new StackFile(
                '// javascript: ' + args.split('\n').join(' ')
              );
              for (++i; code[i] != 'end ' + args; i++)
                jscontextcode.content += '\n' + code[i];
              if (javascript || fileinput.jscontext) {
                this.memory[args] = eval(jscontextcode.content);
              } else {
                this.execute(
                  new StackFile('echo devsh: jscontext is blocked'),
                  stdin,
                  stdout,
                  stdclear
                );
              }
              break;
            }
            default: {
              this.execute(
                this.memory[`FUNCTION[${command}]`] ||
                  new StackFile(
                    'echo devsh: command "' + command + '" not found'
                  ),
                stdin,
                stdout,
                stdclear
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
