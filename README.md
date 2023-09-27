# CLI for explainshell.com
A dead-simple well-formated  CLI for explainshell.com

# Usage
```sh
$ xshell 'your_command_here'
```
or
```sh
$ xshell # you will be prompt
? Enter command to explain
  your_command_here
```

# Examples
```sh
$ xshell ':(){ :|:& };:'
Command:

:(){ : | : & } ; :


Explanations:

:(){ }
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                               │
  │   A shell function is an object that is called like a simple command and executes a compound command with a   │
  │   new set of positional parameters.  Shell functions are declared as follows:                                 │
  │                                                                                                               │
  │   name () compound-command [redirection]                                                                      │
  │   function name [()] compound-command [redirection]                                                           │
  │          This  defines  a  function  named  name.  The reserved word function is optional.  If the function   │
  │          reserved word is supplied, the parentheses are optional.  The body of the function is the compound   │
  │          command  compound-command  (see  Compound  Commands  above).   That  command  is usually a list of   │
  │          commands between {  and  },  but  may  be  any  command  listed  under  Compound  Commands  above.   │
  │          compound-command  is  executed  whenever  name  is specified as the name of a simple command.  Any   │
  │          redirections (see REDIRECTION below) specified when a function is defined are performed  when  the   │
  │          function  is  executed.   The  exit  status of a function definition is zero unless a syntax error   │
  │          occurs or a readonly function with the same name already exists.  When executed, the  exit  status   │
  │          of a function is the exit status of the last command executed in the body.  (See FUNCTIONS below.)   │
  │                                                                                                               │
  └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

: : :
  ┌─────────────────────────────┐
  │                             │
  │   call shell function ':'   │
  │                             │
  └─────────────────────────────┘

|
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                                   │
  │   Pipelines                                                                                                       │
  │       A  pipeline is a sequence of one or more commands separated by one of the control operators | or |&.  The   │
  │       format for a pipeline is:                                                                                   │
  │                                                                                                                   │
  │              [time [-p]] [ ! ] command [ [|⎪|&] command2 ... ]                                                    │
  │                                                                                                                   │
  │       The standard output of command is connected  via  a  pipe  to  the  standard  input  of  command2.   This   │
  │       connection  is performed before any redirections specified by the command (see REDIRECTION below).  If |&   │
  │       is used, the standard error of command is connected to command2's standard input through the pipe; it  is   │
  │       shorthand  for  2>&1  |.   This  implicit  redirection  of  the  standard  error  is  performed after any   │
  │       redirections specified by the command.                                                                      │
  │                                                                                                                   │
  │       The return status of a pipeline is the exit status of the last command, unless  the  pipefail  option  is   │
  │       enabled.   If  pipefail  is  enabled,  the  pipeline's return status is the value of the last (rightmost)   │
  │       command to exit with a non-zero status, or zero if all commands exit successfully.  If the reserved  word   │
  │       !   precedes  a  pipeline, the exit status of that pipeline is the logical negation of the exit status as   │
  │       described above.  The shell waits for all commands in the pipeline to terminate before returning a value.   │
  │                                                                                                                   │
  │       If the time reserved word precedes a pipeline, the elapsed as well as user and system  time  consumed  by   │
  │       its execution are reported when the pipeline terminates.  The -p option changes the output format to that   │
  │       specified by POSIX.  When the shell is in posix mode, it does not recognize time as a  reserved  word  if   │
  │       the  next  token begins with a `-'.  The TIMEFORMAT variable may be set to a format string that specifies   │
  │       how the timing information should be displayed; see the description of TIMEFORMAT under  Shell  Variables   │
  │       below.                                                                                                      │
  │                                                                                                                   │
  │       When the shell is in posix mode, time may be followed by a newline.  In this case, the shell displays the   │
  │       total user and system time consumed by the shell and its children.  The TIMEFORMAT variable may  be  used   │
  │       to specify the format of the time information.                                                              │
  │                                                                                                                   │
  │       Each command in a pipeline is executed as a separate process (i.e., in a subshell).                         │
  │                                                                                                                   │
  └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

&
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                               │
  │   If a command is terminated by the control operator &, the shell executes the command in the background in   │
  │   a subshell.  The shell does not wait for the command to finish, and the return  status  is  0.              │
  │                                                                                                               │
  └───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

;
  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                                        │
  │   Commands separated  by  a ; are executed sequentially; the shell waits for each command to terminate in turn.  The   │
  │   return status is the exit status of the last command executed.                                                       │
  │                                                                                                                        │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```