// https://leetcode.com/problems/validate-binary-search-tree

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  return (
    isValidNode(root.left, Number.MIN_SAFE_INTEGER, root.val) &&
    isValidNode(root.right, root.val, Number.MAX_SAFE_INTEGER)
  );
}

function isValidNode(node, min, max) {
  // If we've reached the end of the tree, then this "branch" is valid
  if (node === null) {
    return true;
  }

  // If the current node is invalid, then this "branch" is invalid
  if (node.val <= min || node.val >= max) {
    return false;
  }

  // Base case, recursively check both left and right branches
  return (
    isValidNode(node.left, min, node.val) &&
    isValidNode(node.right, node.val, max)
  );
}

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * @param {Array<number>} arr
 * @param {number} i
 * @return {TreeNode}
 */
function arrayToTree(arr, i) {
  if (i < arr.length) {
    return new TreeNode(
      arr[i],
      arrayToTree(arr, 2 * i + 1),
      arrayToTree(arr, 2 * i + 2)
    );
  } else {
    return null;
  }
}

/**
 * @param {TreeNode} root
 */
function printTree(root) {
  if (root != null) {
    printTree(root.left);
    console.log(root.val);
    printTree(root.right);
  }
}

/**
 * @param {any} actual
 * @param {any} expected
 */
function assertEquals(actual, expected) {
  if (actual !== expected) {
    throw Error(`Expected: ${expected}, Actual: ${actual}`);
  }
}

let treeNode = arrayToTree([2, 1, 3], 0);
assertEquals(isValidBST(treeNode), true);

treeNode = arrayToTree([5, 1, 4, null, null, 3, 6], 0);
assertEquals(isValidBST(treeNode), false);

treeNode = arrayToTree([5, 4, 6, null, null, 3, 7], 0);
assertEquals(isValidBST(treeNode), false);
