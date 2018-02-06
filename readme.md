# Modular Wordpress Package Manager

Simple package manager that helps load the Modular Wordpress content modules.

This is in a working, but incomplete state, so please use with caution.

## Installation

To install, simply run the following:

```
npm i -g mwpm
```

## Usage

```CLI
mwpm [action] [args...]
```

### Action: install

```CLI
mwpm install
```

### Action: add

```CLI
mwpm add [name] [git repo URL]
```

or for directory mode:

```CLI
mwpm add [name] [git repo URL] -d [directory name]
```