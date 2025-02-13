import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { World } from "../core/world";

/**
 *
 * @param {World} world
 */
export function createUI(world) {
  const gui = new GUI();
  gui.add(world.size, "width", 8, 128, 1).name("Width");
  gui.add(world.size, "height", 8, 64, 1).name("Height");

  const terrainFolder = gui.addFolder("Terrain");
  terrainFolder.add(world.params, "seed", 0, 10000, 1).name("Seed");
  terrainFolder.add(world.params.terrain, "scale", 10, 100).name("Scale");
  terrainFolder.add(world.params.terrain, "magnitude", 0, 1).name("Magnitude");
  terrainFolder.add(world.params.terrain, "offset", 0, 1).name("Offset");

  // update on the change
  gui.onChange(() => {
    world.generate();
  });
}
