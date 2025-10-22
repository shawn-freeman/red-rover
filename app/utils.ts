import { Store } from "./stores/puzzleStore";

export type Node = { name: string; children?: Node[], indent:number };

export function convert(input: string, indent = 0): Node[] {
  const trimmedInput = input.trim();
  const start = trimmedInput.indexOf("(");
  if (start === -1) return []; // nothing to parse

  const [nodes] = parseList(trimmedInput, start, indent);
  return nodes;
}

export function sortAlphabetical(nodes:Node[]): Node[]
{
  nodes.sort((nA, nB) => {
    return nA.name.localeCompare(nB.name, undefined, { sensitivity: "accent"}) 
  });
  //handle sorting children
  for(let node of nodes){
    if(node.children && node.children.length > 0){
      node.children = sortAlphabetical(node.children);
    }
  }
  return nodes;
}

function parseList(input: string, i: number, indent: number): [Node[], number] {
  const nodes: Node[] = [];
  let field = "";

  // assume we're at '(' or right before it
  if (input[i] === "(") i++;

  while (i < input.length) {
    const character = input[i];

    // skip whitespace
    if (character === " " || character === "\t" || character === "\n" || character === "\r") {
      i++;
      continue;
    }

    if (character === ",") {
      // end of a plain field
      if (field.trim()) {
        nodes.push({ name: field.trim(), children: [], indent });
        field = "";
      }
      i++;
      continue;
    }

    if (character === "(") {
      // current field starts a nested group
      const parent = field.trim();
      field = "";
      const [children, nextIndex] = parseList(input, i, indent + 1);
      nodes.push({ name: parent, children, indent });
      i = nextIndex;
      continue;
    }

    if (character === ")") {
      // end of this level; flush any pending field
      if (field.trim()) {
        nodes.push({ name: field.trim(), children: [], indent });
        field = "";
      }
      i++;
      return [nodes, i];
    }

    // accumulate characters of a field name
    field += character;
    i++;
  }

  // ending without a closing ')': flush any pending name
  if (field.trim()) {
    nodes.push({ name: field.trim(), children: [], indent });
  }
  return [nodes, i];
}