import * as ts from 'typescript';
import * as path from "path";

type TreeNode = {
    name: string;
    kind: string;
    type?: string;
    docs?: ts.SymbolDisplayPart[];
    children: TreeNode[];
}

export class Parser {
    sourceFile: ts.SourceFile | undefined;
    program: ts.Program;
    typeChecker: ts.TypeChecker;
    constructor(file: string) {
        let filename = path.join(__dirname, file);
        this.program = ts.createProgram(
            [filename],
            {}
        );
        this.sourceFile = this.program.getSourceFile(filename);
        this.typeChecker = this.program.getTypeChecker();
    }

    getTree() {
        let tree: TreeNode = {
            name: 'root',
            kind: ts.SyntaxKind.SourceFile,
            children: []
        };
        if (this.sourceFile !== undefined) {
            tree = this.getChildren(this.sourceFile);
        }
        return tree;
    }

    getChildren(node: ts.Node): TreeNode {
        let tree: TreeNode = {
            name: node.getText(),
            kind: ts.SyntaxKind[node.kind],
            children: []
        };

        // if (node.kind === ts.SyntaxKind.VariableDeclaration)  {
        console.log(`Kind: ${ts.SyntaxKind[node.kind]}`)
        if (node.kind === ts.SyntaxKind.VariableDeclaration) {
            let type = this.typeChecker.getTypeAtLocation(node);
            tree.type = this.typeChecker.typeToString(type);
        }

        let symbol = this.typeChecker.getSymbolAtLocation(node);

        if (symbol !== undefined) {
            // console.log(symbol.getDocumentationComment(this.typeChecker));
            tree.docs = symbol.getDocumentationComment(this.typeChecker);
        }
        // }

        // Loop over all child nodes
        node.forEachChild(child => {
            tree.children.push(this.getChildren(child));
        });
        
        return tree;
    }
}