const createTree = value => {
    return{
        data: value,
        children: null,
        parent: null
    }
}

const addChild = (node,value) => {
    const newNode = {
        data: value,
        children: null,
        parent: node
    }
    node.children = node.children || []   //node.children 有可能是一个空数组
    node.children.push(newNode)
    return newNode
}

const travel = (tree, fn) => {
    fn(tree)
    if(!tree.children){
        return
    }
    for(let i=0; i<tree.children.length; i++){
        travel(tree.children[i],fn)
    }
}

const find = (tree, node) => {
    if(tree === node){
        return tree
    }else if(tree.children){
        for(let i=0;i<tree.children.length;i++){
            const result = find(tree.children[i],node)
            if(result){return result}
        }
        return undefined //如果儿子里都找不到
    }else{
        return undefined //如果不是树，也不是儿子
    }
} 

//删除节点主要是删除这个节点在树里的地址
const removeNode = (tree, node) => {
    const siblings = node.parent.children
    let index = 0
    for(let i=1; i<siblings.length; i++){
        if(siblings[i] === node){
            index = i
        }
    }
    siblings.splice(index, 1)
}

const tree = createTree(10)
const node2 = addChild(tree,20)
const node3 = addChild(tree,30)
const node4 = addChild(tree,40)
addChild(tree,50)
addChild(node2,666)
addChild(node2,777)
addChild(node2,888)
addChild(node2,999)
console.log(tree)

const fn = node => {
    console.log(node.data)
}

travel(tree,fn)

console.log(find(tree,node2))

console.log(removeNode(tree, node4))