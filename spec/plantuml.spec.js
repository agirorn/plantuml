const plantuml = require('..');

describe('plantuml', () => {
  it('Convert PlantUML to SVG', async () => {
    const svg = await plantuml(`
      @startuml
      Bob -> Alice : hello
      Alice -> Wonderland: hello
      Wonderland -> next: hello
      next -> Last: hello
      Last -> next: hello
      next -> Wonderland : hello
      Wonderland -> Alice : hello
      Alice -> Bob: hello
      @enduml
    `);
    expect(svg).toContain('<svg ');
    expect(svg).toContain('</svg>');
    expect(svg).not.toContain('<!--');
    expect(svg).not.toContain('-->');
  });
});
