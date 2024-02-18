const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // add `release` to the list of allowed types
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "release",
      ],
    ],
  },
};

module.exports = config;
