import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementOverlapped(locator: Locator): Promise<boolean> {
    return await locator.evaluate((el) => {
      const isOverlappedAt = (x: number, y: number) => {
        const topEl = document.elementFromPoint(x, y);
        return topEl !== el && !el.contains(topEl);
      };

      const rect = el.getBoundingClientRect();
      const points = [
        [rect.left + 1, rect.top + 1], // top-left
        [rect.right - 1, rect.top + 1], // top-right
        [rect.left + 1, rect.bottom - 1], // bottom-left
        [rect.right - 1, rect.bottom - 1], // bottom-right
        [rect.left + rect.width / 2, rect.top + rect.height / 2], // center
      ];

      return points.some(([x, y]) => isOverlappedAt(x, y));
    });

    // if (anyOverlapped) {
    //   el.scrollIntoView({
    //     behavior: "auto",
    //     block: "center",
    //     inline: "center",
    //   });
    // }
  }
}
