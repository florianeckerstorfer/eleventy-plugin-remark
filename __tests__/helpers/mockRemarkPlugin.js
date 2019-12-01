import visit from 'unist-util-visit';

function mockRemarkPlugin(options = {}) {
  function transform(markdownAST) {
    visit(markdownAST, `text`, node => {
      node.type = 'html';
      node.value = String(node.value).toUpperCase();
    });
  }

  return transform;
}

export default mockRemarkPlugin;
