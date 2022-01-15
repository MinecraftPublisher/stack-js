/*
 * Stack.js
 * Create a small, Functioning operating system in the web.
 * A filesystem needs to be provided to the system, Otherwise it will not function.
 */
import registryDB from "/registryDB.js";
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
    this.content = filetext || "";
    this.registryname = registryname || "default.st";
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
export let color = "ff503d";
export let path = "/";
async function linify(input, model, stdin) {
  var line = input;
  for (var match of line.matchAll(/%{[^%{}]+}/g) || []) {
    let output = "";
    // run the code with a custom stdout
    await model.execute(
      new StackFile(match[0].slice(2, match[0].length - 1)),
      stdin,
      (string) => {
        output += string;
      }
    );
    line = line.replace(match[0], output);
  }
  return line;
}
export function stack(filesystem, options) {
  const system = {
    memory: {},
    filesystem: filesystem || {
      "/boot.st": new StackFile("module boot")
    },
    stdin: options?.stdin,
    stdout: options?.stdout,
    stdclear: options?.stdclear,
    expansion: {},
    /**
     * Executes a StackScript, And allows javascript context if the file matches the registry.
     *
     * @param {StackFile} fileinput - The file object to execute.
     * @param {function} stdin - A function to provide the user input when called.
     * @param {function} stdout - A function to show a string to the user when called.
     */
    execute: async function (
      fileinput,
      stdin = this.stdin || prompt,
      stdout = this.stdout || console.log,
      stdclear = this.stdclear || function () {},
      isolated = options?.isolated,
      javascript = options?.javascript
    ) {
      const code = fileinput.content.split("\n");
      for (var i = 0; i < code.length; i++) {
        var line = await linify(code[i], this, stdin);
        this.memory["path"] = path;
        const array = line.split(" ");
        let command = array[0];
        let args = array.slice(1).join(" ");
        if (
          line !== "" &&
          line !== " " &&
          command !== "#" &&
          command !== "//" &&
          command !== "rem"
        ) {
          let commands = {
            echo: async () => {
              stdout(args, color, true);
            },
            key: async () => {
              stdout(args, color, false);
            },
            hex: async () => {
              if (args.length <= 1) {
                color = "ff503d";
              } else {
                color = args;
              }
            },
            clear: async () => {
              stdclear();
            },
            prompt: async () => {
              this.memory[`PROMPT[]`] = args;
            },
            memread: async () => {
              stdout(this.memory[args]);
            },
            memwrite: async () => {
              this.memory[args.split(" ")[0]] = args
                .split(" ")
                .slice(1)
                .join(" ");
            },
            memrm: async () => {
              this.memory[args] = undefined;
            },
            run: async () => {
              if (!isolated) {
                await this.execute(
                  new StackFile(args),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  false
                );
              } else {
                await this.execute(
                  new StackFile("echo <b>devsh: program is isolated</b>"),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            input: async () => {
              this.memory[args] = await stdin(this.memory[`PROMPT[]`]);
            },
            sleep: async () => {
              await sleep(parseInt(args, 10));
            },
            /* filesystem-related commands */
            read: async () => {
              stdout(
                this.filesystem[args.startsWith("/") ? args : path + args]
                  ?.content || "<b>devsh: couldn't find file " + args + "</b>",
                color,
                true
              );
            },
            write: async () => {
              this.filesystem[
                args.split(" ")[0].startsWith("/")
                  ? args.split(" ")[0]
                  : path + args.split(" ")[0]
              ] = new StackFile(
                args.split(" ").slice(1).join(" ").split("\\n").join("\n")
              );
            },
            rm: async () => {
              if (!args.startsWith("/")) args = "/" + args;
              if (this.filesystem[args]) this.filesystem[args] = undefined;
            },
            import: async () => {
              if (!isolated) {
                await this.execute(
                  this.filesystem[path + args] ||
                    new StackFile(
                      "echo <b>devsh: couldn't find file \"" + args + '"</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile("echo <b>devsh: program is isolated</b>"),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            module: async () => {
              if (!isolated) {
                await this.execute(
                  new StackFile(registry[args + ".st"], args + ".st", true) ||
                    new StackFile(
                      "echo <b>devsh: couldn't find module \"" + args + '"</b>',
                      "",
                      true
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile("echo <b>devsh: program is isolated</b>"),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            unlock: async () => {
              if (javascript || fileinput.jscontext) {
                this.filesystem[
                  args.startsWith("/") ? args : path + args
                ].jscontext = true;
                await this.execute(
                  new StackFile("echo File unlocked."),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              } else {
                await this.execute(
                  new StackFile(
                    "echo <b>devsh: jscontext is currently locked.</b>"
                  ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            func: async () => {
              this.memory[`FUNCTION[${args}]`] = new StackFile(
                "# function: " + args,
                fileinput.registryname,
                fileinput.jscontext
              );
              for (++i; code[i] !== "end " + args; i++)
                this.memory[`FUNCTION[${args}]`].content += "\n" + code[i];
            },
            jscontext: async () => {
              let jscontextcode = new StackFile(
                "// javascript: " + args.split("\n").join(" ")
              );
              for (++i; code[i] !== "end " + args; i++) {
                jscontextcode.content += "\n" + code[i];
              }
              if (javascript || fileinput.jscontext) {
                try {
                  this.memory[args] = eval(
                    `const require_data = {};
                    
                    const stack = {"memory": ${JSON.stringify(
                      this.memory
                    )}, "filesystem": ${JSON.stringify(
                      this.filesystem
                    )}, "path": ${JSON.stringify(
                      path
                    )}, stdin: ${stdin}, stdout: ${stdout}}; const require = (name) => { 
                      require_data[name] = require_data[name] || {}
                      require_data[name].resolved = require_data[name]?.resolved || false
                      require_data[name].data = require_data[name]?.data || null
                      import(name).then((module) => { 
                        console.log('gottem!');
                        require_data[name].resolved = true; require_data[name].data = module;
                      }); 
                    }` + jscontextcode.content
                  );
                } catch (err) {
                  stdout(
                    "<b>devsh: error while in jscontext: " + err + "</b>",
                    color,
                    true
                  );
                  this.memory[args] = undefined;
                }
              } else {
                await this.execute(
                  new StackFile("echo <b>devsh: jscontext is blocked</b>"),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            if: async () => {
              if (
                this.memory[args.split(" ")[0]] ===
                this.memory[args.split(" ")[1]]
              ) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[2]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            ifnot: async () => {
              if (
                this.memory[args.split(" ")[0]] !==
                this.memory[args.split(" ")[1]]
              ) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[2]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            existsfile: async () => {
              if (this.filesystem[args.split(" ")[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[1]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            existsnotfile: async () => {
              if (!this.filesystem[args.split(" ")[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[1]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            exists: async () => {
              if (this.memory[args.split(" ")[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[1]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            },
            existsnot: async () => {
              if (!this.memory[args.split(" ")[0]]) {
                await this.execute(
                  this.memory[`FUNCTION[${args.split(" ")[1]}]`] ||
                    new StackFile(
                      'echo <b>devsh: command "' +
                        args.split(" ")[2] +
                        '" not found</b>'
                    ),
                  stdin,
                  stdout,
                  stdclear,
                  isolated,
                  javascript || fileinput.jscontext
                );
              }
            }
          };
          commands = Object.assign(commands, this.expansion);
          if (commands[command]) {
            await commands[command]();
          } else {
            if (args) {
              this.memory[`func-${command}-args`] = args;
              for (i = 0; i < args.split(" ").length; i++) {
                this.memory[`func-${command}-arg-${i}`] = args.split(" ")[i];
              }
            }
            await sleep(50);
            await this.execute(
              this.memory[`FUNCTION[${command}]`] ||
                new StackFile(
                  'echo <b>devsh: command "' + command + '" not found</b>'
                ),
              stdin,
              stdout,
              stdclear,
              isolated,
              javascript || fileinput.jscontext
            );
            if (args) {
              this.memory[`func-${command}-args`] = undefined;
              for (i = 0; i < args.split(" ").length; i++) {
                this.memory[`func-${command}-arg-${i}`] = undefined;
              }
            }
          }
        }
      }
    }
  };
  return system;
}
export default stack;
