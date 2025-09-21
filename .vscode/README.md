# VSCode Configuration

This directory contains VSCode workspace settings that ensure consistent code formatting, linting, and development experience across the team.

## 📁 Files Overview

### `settings.json`

Configures VSCode to automatically format code and fix ESLint errors on save.

**Key Features:**

- ✅ **Auto-format on save** using Prettier
- ✅ **Auto-fix ESLint errors** on save
- ✅ **Auto-organize imports** on save
- ✅ **Language-specific formatters** for JS, TS, JSX, TSX, JSON, CSS, HTML, Markdown
- ✅ **Tailwind CSS IntelliSense** support
- ✅ **TypeScript auto-imports** and file move updates
- ✅ **Optimized search and file watching** (excludes node_modules, .next, etc.)

### `extensions.json`

Recommends essential VSCode extensions for the project.

**Recommended Extensions:**

- **Prettier** - Code formatter
- **ESLint** - JavaScript/TypeScript linter
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **TypeScript** - Enhanced TypeScript support
- **Jest** - Testing support
- **GitLens** - Enhanced Git integration
- **Path Intellisense** - File path autocomplete
- **Auto Rename Tag** - HTML/JSX tag renaming

### `launch.json`

Provides debugging configurations for Next.js and Jest.

**Debug Configurations:**

- **Next.js server-side debugging**
- **Next.js client-side debugging** (Chrome)
- **Next.js full-stack debugging**
- **Jest current file debugging**
- **Jest all tests debugging**

## 🚀 Getting Started

### 1. Install Recommended Extensions

When you open this project in VSCode, you'll see a notification to install recommended extensions. Click "Install All" or install them manually:

```bash
# Essential extensions
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
```

### 2. Verify Configuration

1. Open any `.tsx` or `.ts` file
2. Make some formatting changes (add extra spaces, remove semicolons, etc.)
3. Save the file (`Cmd+S` / `Ctrl+S`)
4. The file should automatically format and fix ESLint issues

### 3. Test Auto-Formatting

Create a test file with intentionally bad formatting:

```typescript
// test.ts
const test = {
  name: 'John',
  age: 25,
  active: true,
}
```

Save the file and it should automatically format to:

```typescript
// test.ts
const test = {
  name: 'John',
  age: 25,
  active: true,
}
```

## 🛠️ Configuration Details

### Auto-Format on Save

Files are automatically formatted using Prettier when saved:

- **JavaScript/TypeScript**: Prettier formatting
- **JSON**: Prettier formatting
- **CSS/SCSS**: Prettier formatting
- **HTML**: Prettier formatting
- **Markdown**: Prettier formatting

### Auto-Fix ESLint on Save

ESLint errors that can be automatically fixed are resolved on save:

- **Unused imports** are removed
- **Import order** is organized
- **Code style issues** are fixed
- **Type errors** are highlighted (but not auto-fixed)

### Debugging Support

Use the Debug panel (`Cmd+Shift+D` / `Ctrl+Shift+D`) to:

- Debug Next.js server-side code
- Debug React components in Chrome
- Debug Jest tests
- Set breakpoints and inspect variables

## 📋 Troubleshooting

### Extensions Not Working

1. Ensure all recommended extensions are installed
2. Reload VSCode (`Cmd+Shift+P` → "Developer: Reload Window")
3. Check the Output panel for error messages

### Auto-Format Not Working

1. Verify Prettier extension is installed and enabled
2. Check that `.prettierrc` exists in the project root
3. Ensure `editor.formatOnSave` is `true` in settings

### ESLint Not Auto-Fixing

1. Verify ESLint extension is installed and enabled
2. Check that `eslint.config.mjs` exists in the project root
3. Ensure `source.fixAll.eslint` is set to `"explicit"` in settings

### TypeScript Issues

1. Ensure TypeScript extension is installed
2. Check that `tsconfig.json` is properly configured
3. Restart TypeScript server (`Cmd+Shift+P` → "TypeScript: Restart TS Server")

## 🎯 Best Practices

### Code Quality

- **Always save files** to trigger auto-formatting and linting
- **Review auto-fixes** to understand what was changed
- **Don't ignore ESLint warnings** - fix them or add proper exceptions
- **Use TypeScript strictly** - avoid `any` types when possible

### Development Workflow

1. Write code without worrying about formatting
2. Save file to auto-format and fix issues
3. Review changes before committing
4. Use debugging configurations for troubleshooting

### Team Consistency

- **All team members** should use the same VSCode configuration
- **Install recommended extensions** for consistent experience
- **Don't override** workspace settings in user settings
- **Commit VSCode config** to version control

## 📚 Additional Resources

- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)
- [VSCode Settings Reference](https://code.visualstudio.com/docs/getstarted/settings)
- [Next.js Debugging](https://nextjs.org/docs/advanced-features/debugging)
- [Jest Debugging](https://jestjs.io/docs/troubleshooting)
