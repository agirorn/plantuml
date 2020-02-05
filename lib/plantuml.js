const { resolve } = require('path');
const getStream = require('get-stream');
const execa = require('execa');

const findComments = (text) => text.match(/<!--(.*?)-->/gms);

const plantuml = async (uml) => {
  const plantumlJar = resolve(__dirname, '../vendor/plantuml.jar');
  const subprocess = execa(
    'java',
    [
      '-jar',
      '-Djava.awt.headless=true',
      '--add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax="ALL-UNNAMED"',
      plantumlJar,
      '-tsvg',
      '-pipe',
    ],
  );

  process.nextTick(() => {
    subprocess.stdin.write(uml);
    subprocess.stdin.end();
  });

  const promise = getStream(subprocess.stdout)
    .then((svg) => (findComments(svg) || [])
      .reduce((file, comment) => file.replace(comment, ''), svg));

  return promise;
};

module.exports = plantuml;
