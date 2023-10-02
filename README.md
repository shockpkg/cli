# shockpkg CLI

The shockpkg CLI

[![npm](https://img.shields.io/npm/v/@shockpkg/cli.svg)](https://npmjs.com/package/@shockpkg/cli)
[![node](https://img.shields.io/node/v/@shockpkg/cli.svg)](https://nodejs.org)

[![size](https://packagephobia.now.sh/badge?p=@shockpkg/cli)](https://packagephobia.now.sh/result?p=@shockpkg/cli)
[![downloads](https://img.shields.io/npm/dm/@shockpkg/cli.svg)](https://npmcharts.com/compare/@shockpkg/cli?minimal=true)

[![Build Status](https://github.com/shockpkg/cli/workflows/main/badge.svg?branch=master)](https://github.com/shockpkg/cli/actions?query=workflow%3Amain+branch%3Amaster)

# Overview

The CLI package manager for shockpkg packages.

# Usage

<!-- usage -->
```sh-session
$ npm install -g @shockpkg/cli
$ shockpkg COMMAND
running command...
$ shockpkg (--version|-v)
@shockpkg/cli/3.0.2 platform-arch node-vX.X.X
$ shockpkg --help [COMMAND]
USAGE
  $ shockpkg COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`shockpkg about`](#shockpkg-about)
* [`shockpkg available`](#shockpkg-available)
* [`shockpkg cleanup`](#shockpkg-cleanup)
* [`shockpkg file PACKAGE`](#shockpkg-file-package)
* [`shockpkg help [COMMAND]`](#shockpkg-help-command)
* [`shockpkg info PACKAGE`](#shockpkg-info-package)
* [`shockpkg install PACKAGES`](#shockpkg-install-packages)
* [`shockpkg installed`](#shockpkg-installed)
* [`shockpkg is-current PACKAGE`](#shockpkg-is-current-package)
* [`shockpkg is-installed PACKAGE`](#shockpkg-is-installed-package)
* [`shockpkg is-obsolete PACKAGE`](#shockpkg-is-obsolete-package)
* [`shockpkg list`](#shockpkg-list)
* [`shockpkg obsolete`](#shockpkg-obsolete)
* [`shockpkg outdated`](#shockpkg-outdated)
* [`shockpkg path`](#shockpkg-path)
* [`shockpkg remove PACKAGES`](#shockpkg-remove-packages)
* [`shockpkg update`](#shockpkg-update)
* [`shockpkg upgrade`](#shockpkg-upgrade)
* [`shockpkg url`](#shockpkg-url)
* [`shockpkg verify PACKAGE`](#shockpkg-verify-package)
* [`shockpkg version`](#shockpkg-version)

## `shockpkg about`

Show info about CLI.

```
USAGE
  $ shockpkg about [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Show info about CLI.
```

_See code: [src/commands/about.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/about.ts)_

## `shockpkg available`

List the available packages not installed.

```
USAGE
  $ shockpkg available [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List the available packages not installed.
```

_See code: [src/commands/available.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/available.ts)_

## `shockpkg cleanup`

Cleanup temporary files and obsolete packages.

```
USAGE
  $ shockpkg cleanup [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Cleanup temporary files and obsolete packages.
```

_See code: [src/commands/cleanup.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/cleanup.ts)_

## `shockpkg file PACKAGE`

Get package file path.

```
USAGE
  $ shockpkg file PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get package file path.
```

_See code: [src/commands/file.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/file.ts)_

## `shockpkg help [COMMAND]`

Show CLI help.

```
USAGE
  $ shockpkg help [COMMAND] [-r]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -r, --recursive  Include all child commands in output.

DESCRIPTION
  Show CLI help.
```

_See code: [src/commands/help.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/help.ts)_

## `shockpkg info PACKAGE`

View info for package.

```
USAGE
  $ shockpkg info PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  View info for package.
```

_See code: [src/commands/info.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/info.ts)_

## `shockpkg install PACKAGES`

Install packages.

```
USAGE
  $ shockpkg install PACKAGES [-h]

ARGUMENTS
  PACKAGES  List of packages to be installed.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Install packages.
```

_See code: [src/commands/install.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/install.ts)_

## `shockpkg installed`

List the installed packages.

```
USAGE
  $ shockpkg installed [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List the installed packages.
```

_See code: [src/commands/installed.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/installed.ts)_

## `shockpkg is-current PACKAGE`

Check package is installed and current.

```
USAGE
  $ shockpkg is-current PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Check package is installed and current.
```

_See code: [src/commands/is-current.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/is-current.ts)_

## `shockpkg is-installed PACKAGE`

Check package is installed.

```
USAGE
  $ shockpkg is-installed PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Check package is installed.
```

_See code: [src/commands/is-installed.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/is-installed.ts)_

## `shockpkg is-obsolete PACKAGE`

Check package is obsolete.

```
USAGE
  $ shockpkg is-obsolete PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Check package is obsolete.
```

_See code: [src/commands/is-obsolete.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/is-obsolete.ts)_

## `shockpkg list`

List all the packages in the package list.

```
USAGE
  $ shockpkg list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List all the packages in the package list.
```

_See code: [src/commands/list.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/list.ts)_

## `shockpkg obsolete`

List obsolete installed packages.

```
USAGE
  $ shockpkg obsolete [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List obsolete installed packages.
```

_See code: [src/commands/obsolete.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/obsolete.ts)_

## `shockpkg outdated`

List outdated installed packages.

```
USAGE
  $ shockpkg outdated [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  List outdated installed packages.
```

_See code: [src/commands/outdated.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/outdated.ts)_

## `shockpkg path`

Get package manager path.

```
USAGE
  $ shockpkg path [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get package manager path.
```

_See code: [src/commands/path.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/path.ts)_

## `shockpkg remove PACKAGES`

Remove packages.

```
USAGE
  $ shockpkg remove PACKAGES [-h]

ARGUMENTS
  PACKAGES  List of packages to be removed.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Remove packages.
```

_See code: [src/commands/remove.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/remove.ts)_

## `shockpkg update`

Update the packages list.

```
USAGE
  $ shockpkg update [-h] [-s]

FLAGS
  -h, --help     Show CLI help.
  -s, --summary  Summarize the updated packages.

DESCRIPTION
  Update the packages list.
```

_See code: [src/commands/update.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/update.ts)_

## `shockpkg upgrade`

Upgrade all outdated packages.

```
USAGE
  $ shockpkg upgrade [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Upgrade all outdated packages.
```

_See code: [src/commands/upgrade.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/upgrade.ts)_

## `shockpkg url`

Get package manager package list URL.

```
USAGE
  $ shockpkg url [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Get package manager package list URL.
```

_See code: [src/commands/url.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/url.ts)_

## `shockpkg verify PACKAGE`

Verify an installed package.

```
USAGE
  $ shockpkg verify PACKAGE [-h]

ARGUMENTS
  PACKAGE  Package ID.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Verify an installed package.
```

_See code: [src/commands/verify.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/verify.ts)_

## `shockpkg version`

Show CLI version.

```
USAGE
  $ shockpkg version

DESCRIPTION
  Show CLI version.
```

_See code: [src/commands/version.ts](https://github.com/shockpkg/cli/blob/3.0.2/src/commands/version.ts)_
<!-- commandsstop -->

# Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.

# License

Copyright (c) 2018-2023 JrMasterModelBuilder

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.
