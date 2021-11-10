window.viz = root => {
  if (root === undefined) {
    // eslint-disable-next-line no-param-reassign
    root = window.document.body;
  }

  const visualizer = window.open('http://localhost:8080/');
  // build the list of all components
  const flat = {};

  const flater = nodes => {
    const l = nodes.length;
    for (let i = 0; i < l; i += 1) {
      flat[nodes[i].nodeName] = nodes[i];
      if (nodes[i].nodeName.includes('-') && nodes[i].shadowRoot) {
        flater(nodes[i].shadowRoot.querySelectorAll('*'));
      }
    }
  };

  if (root.shadowRoot) {
    flater(root.shadowRoot.querySelectorAll('*'));
  } else {
    flater(root.querySelectorAll('*'));
  }

  window.onmessage = m => {
    if (m.data.type === 'component-request') {
      const e = flat[m.data.component];
      if (e !== undefined) {
        visualizer.postMessage(
          {
            type: 'render-request',
            data: e.shadowRoot.innerHTML || e.innerHTML,
          },
          'http://localhost:8080/',
        );
        // eslint-disable-next-line no-console
        console.dir({
          type: 'render-request',
          data: e.shadowRoot.innerHTML || e.innerHTML,
        });
      }
    }

    if (m.data.type === 'analyzer-ready') {
      let data = root.innerHTML;
      if (root.shadowRoot && root.shadowRoot.innerHTML) {
        data = root.shadowRoot.innerHTML;
      }

      visualizer.postMessage(
        {
          type: 'render-request',
          data,
        },
        'http://localhost:8080/',
      );
    }
  };
};
