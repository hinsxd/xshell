#!/usr/bin/env node
// @ts-check
import { load } from "cheerio";
import { Command } from "commander";
import inquirer from "inquirer";
import { shuffledcolors, UNKNOWN_PLACEHOLDER } from "./lib.js";
import boxen from "boxen";
import chalk from "chalk";

const program = new Command();
program
  .name("explain")
  .description("Explain shell")
  .version("0.1.0")
  .argument("[command]", "command to explain")
  .action(
    async (
      /**
       * @type {string | undefined}
       */
      command
    ) => {
      while (!command) {
        command = await inquirer
          .prompt([
            {
              type: "input",
              name: "command",
              message: "Enter command to explain\n",
            },
          ])
          .then(({ command }) => command);
      }
      const res = await fetch(
        `https://explainshell.com/explain?cmd=${encodeURIComponent(command)}`
      ).then((r) => r.text());
      const $ = load(res);

      /**
       * @type{Record<string | symbol, string>}
       */
      const assignedcolors = {};
      // assign colors
      {
        $("#help pre").each(function (i, el) {
          const id = $(el).attr("id");

          const color = shuffledcolors.shift();

          if (id && color) {
            shuffledcolors.push(color);
            assignedcolors[id] = color;
          }
        });

        const color = shuffledcolors.shift();
        if (color) assignedcolors[UNKNOWN_PLACEHOLDER] = color;
      }

      const cmd = $("div#command .command0, div#command [helpref]");
      cmd.find(".dropdown-menu").remove();

      const coloredString = [...cmd]
        .map((el) => {
          const helpref = $(el).attr("helpref") || UNKNOWN_PLACEHOLDER;

          const color = assignedcolors[helpref];

          const text = $(el).text();

          if (helpref === UNKNOWN_PLACEHOLDER) return chalk.hex(color)(text);

          return chalk.hex(color).underline(text);
        })
        .join(" ");

      console.log();
      console.log("Command:");
      console.log();
      console.log(coloredString);
      console.log();
      console.log();
      console.log("Explanations:");
      console.log();

      $("table#help [id^=help-]").each((i, el) => {
        const id = $(el).attr("id");
        if (!id) return;
        const color = assignedcolors[id];

        const cmdText = [...cmd]
          .filter((el) => $(el).attr("helpref") === id)
          .map((el) => chalk.hex(color).underline($(el).text()))
          .join(" ");

        console.group(cmdText);

        const explaination = $(`#${id}`).text();
        console.log(
          boxen(explaination, {
            padding: 1,
            borderColor: color,
          })
        );
        console.groupEnd();
        console.log();
      });
    }
  );

program.parse();
