# cli

The shockpkg CLI.

[![npm](https://img.shields.io/npm/v/@shockpkg/cli.svg)](https://npmjs.com/package/@shockpkg/cli)
[![node](https://img.shields.io/node/v/@shockpkg/cli.svg)](https://nodejs.org)

[![dependencies](https://david-dm.org/shockpkg/cli.svg)](https://david-dm.org/shockpkg/cli)
[![size](https://packagephobia.now.sh/badge?p=@shockpkg/cli)](https://packagephobia.now.sh/result?p=@shockpkg/cli)
[![downloads](https://img.shields.io/npm/dm/@shockpkg/cli.svg)](https://npmcharts.com/compare/@shockpkg/cli?minimal=true)

[![travis-ci](https://travis-ci.org/shockpkg/cli.svg?branch=master)](https://travis-ci.org/shockpkg/cli)


# Overview

The CLI package manager for shockpkg packages.


# Usage
<!-- usage -->
```sh-session
$ npm install -g @shockpkg/cli
$ shockpkg COMMAND
running command...
$ shockpkg (-v|--version|version)
@shockpkg/cli/0.0.0 darwin-x64 node-v12.0.0
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
* [`shockpkg install-full PACKAGES`](#shockpkg-install-full-packages)
* [`shockpkg install-slim PACKAGES`](#shockpkg-install-slim-packages)
* [`shockpkg installed`](#shockpkg-installed)
* [`shockpkg is-current PACKAGE`](#shockpkg-is-current-package)
* [`shockpkg is-installed PACKAGE`](#shockpkg-is-installed-package)
* [`shockpkg is-obsolete PACKAGE`](#shockpkg-is-obsolete-package)
* [`shockpkg obsolete`](#shockpkg-obsolete)
* [`shockpkg outdated`](#shockpkg-outdated)
* [`shockpkg path`](#shockpkg-path)
* [`shockpkg remove PACKAGES`](#shockpkg-remove-packages)
* [`shockpkg update`](#shockpkg-update)
* [`shockpkg upgrade`](#shockpkg-upgrade)
* [`shockpkg upgrade-full`](#shockpkg-upgrade-full)
* [`shockpkg upgrade-slim`](#shockpkg-upgrade-slim)
* [`shockpkg url`](#shockpkg-url)
* [`shockpkg verify PACKAGE`](#shockpkg-verify-package)

## `shockpkg about`

display info about program

```
USAGE
  $ shockpkg about

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/about.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/about.ts)_

## `shockpkg available`

list the available packages not installed

```
USAGE
  $ shockpkg available

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/available.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/available.ts)_

## `shockpkg cleanup`

cleanup temporary files and obsolete packages

```
USAGE
  $ shockpkg cleanup

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/cleanup.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/cleanup.ts)_

## `shockpkg file PACKAGE`

get package file path

```
USAGE
  $ shockpkg file PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/file.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/file.ts)_

## `shockpkg help [COMMAND]`

display help for shockpkg

```
USAGE
  $ shockpkg help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `shockpkg info PACKAGE`

view info for package

```
USAGE
  $ shockpkg info PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/info.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/info.ts)_

## `shockpkg install PACKAGES`

install packages, slim method

```
USAGE
  $ shockpkg install PACKAGES

ARGUMENTS
  PACKAGES  list of packages to be installed

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/install.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/install.ts)_

## `shockpkg install-full PACKAGES`

install packages, full method

```
USAGE
  $ shockpkg install-full PACKAGES

ARGUMENTS
  PACKAGES  list of packages to be installed

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/install-full.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/install-full.ts)_

## `shockpkg install-slim PACKAGES`

install packages, slim method

```
USAGE
  $ shockpkg install-slim PACKAGES

ARGUMENTS
  PACKAGES  list of packages to be installed

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/install-slim.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/install-slim.ts)_

## `shockpkg installed`

list the installed packages

```
USAGE
  $ shockpkg installed

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/installed.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/installed.ts)_

## `shockpkg is-current PACKAGE`

check package is installed and current

```
USAGE
  $ shockpkg is-current PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/is-current.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/is-current.ts)_

## `shockpkg is-installed PACKAGE`

check package is installed

```
USAGE
  $ shockpkg is-installed PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/is-installed.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/is-installed.ts)_

## `shockpkg is-obsolete PACKAGE`

check package is obsolete

```
USAGE
  $ shockpkg is-obsolete PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/is-obsolete.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/is-obsolete.ts)_

## `shockpkg obsolete`

list the obsolete packages

```
USAGE
  $ shockpkg obsolete

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/obsolete.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/obsolete.ts)_

## `shockpkg outdated`

list the outdated packages

```
USAGE
  $ shockpkg outdated

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/outdated.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/outdated.ts)_

## `shockpkg path`

get package manager path

```
USAGE
  $ shockpkg path

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/path.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/path.ts)_

## `shockpkg remove PACKAGES`

remove packages

```
USAGE
  $ shockpkg remove PACKAGES

ARGUMENTS
  PACKAGES  list of packages to be removed

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/remove.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/remove.ts)_

## `shockpkg update`

update the packages list

```
USAGE
  $ shockpkg update

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/update.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/update.ts)_

## `shockpkg upgrade`

install packages, slim method

```
USAGE
  $ shockpkg upgrade

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/upgrade.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/upgrade.ts)_

## `shockpkg upgrade-full`

install packages, full method

```
USAGE
  $ shockpkg upgrade-full

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/upgrade-full.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/upgrade-full.ts)_

## `shockpkg upgrade-slim`

install packages, slim method

```
USAGE
  $ shockpkg upgrade-slim

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/upgrade-slim.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/upgrade-slim.ts)_

## `shockpkg url`

get package manager package list URL

```
USAGE
  $ shockpkg url

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/url.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/url.ts)_

## `shockpkg verify PACKAGE`

verify an installed package

```
USAGE
  $ shockpkg verify PACKAGE

ARGUMENTS
  PACKAGE  package id

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/verify.ts](https://github.com/shockpkg/cli/blob/v0.0.0/src/commands/verify.ts)_
<!-- commandsstop -->


# Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.


# License

Copyright (c) 2018-2019 JrMasterModelBuilder

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.
