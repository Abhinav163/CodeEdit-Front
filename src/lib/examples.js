export const EXAMPLES = {
  python: `print("Hello, Python!")\nname = input()\nprint("You typed:", name)`,
  javascript: `console.log("Hello, JavaScript!");\nprocess.stdin.on('data', d => console.log("You typed:", d.toString().trim()));`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  cout << "Hello, C++!" << endl;\n  string s;\n  if (getline(cin, s)) cout << "You typed: " << s << endl;\n  return 0;\n}`
}
