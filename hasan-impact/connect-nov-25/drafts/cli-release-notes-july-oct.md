# CLI Release Notes


## [v1.2.0](https://pypi.org/project/ms-fabric-cli/v1.2.0) - October 21, 2025

### 🆕 New Items Support

* Added support for [Dataflow](https://learn.microsoft.com/en-us/fabric/data-factory/dataflows-gen2-overview) item

### ✨ New Functionality

* Enable GraphQLApi item support in `mv` and `cp` commands
* Add `--block-path-collision` (`-bpc`) flag to `cp` command to prevent implicit overwriting when copying items to another workspace

### 🔧 Bug Fix

* Align output font color in JSON output format
* Return newly created item in `ls` command in Folder path

### ⚡ Additional Optimizations

* Enhance auto-completion with supported config keys


## [v1.1.0](https://pypi.org/project/ms-fabric-cli/1.1.0/) - September 10, 2025

### 🆕 New Items Support

* Added support for GraphQLApi items definitions

### ✨ New Functionality

* Added support for folders in `fs` commands, including `cp` and `mv`
* Added option to output command results in JSON format
* Implemented context persistence between `command_line` mode operations
* Added autocomplete support for commands and arguments in `command_line` mode
* Enabled support for Workspace Level Private Links in `api` command
* Added support for `set` and `rm` commands in Gateway and Connection

### 🔧 Bug Fix

* Fixed download of binary files with the `cp` command
* Disabled the `mv` command for certain real-time intelligence (RTI) items
* Fixed case sensitivity issues in connection matching

### ⚡ Additional Optimizations

* Adjusted polling intervals for jobs and long-running operations
* Standardized configuration key naming conventions

### 📝 Documentation Update

* Switched to MIT license
## [v1.0.1](https://pypi.org/project/ms-fabric-cli/1.0.1/) - July 15, 2025

### 🔧 Bug Fix

* Fixed `get` command results for items whose definitions include binary files
* Fixed `--timeout` parameter being parsed as string so it’s now correctly parsed as an integer
* Fixed `table load` command when the table doesn't exist
* Fixed printed output when exiting login with Ctrl+C during managed identity authentication
* Fixed incorrect sorting of results in the `ls` command
* Fixed resolution of the log file’s real path in Windows sandbox environments
* Fixed handling of `CopyJob` and `VariableLibrary` items in the `import` command

### ⚡ Additional Optimizations

* Improved error messages
* Added support for custom files in `api` commands