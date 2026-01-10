import { expect, type Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // console.errorをキャッチしてテスト失敗にする
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      throw new Error(`console.error: ${msg.text()}`);
    }
  });

  await page.goto("/");
  await page.waitForLoadState("load");
});

test.describe("Home Tests", () => {
  const checkImage = async (page: Page): Promise<string> => {
    // alt属性で対象の画像を特定
    const img = page.locator('img[alt="A random cat"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute("src", /.+/);
    const src = await img.getAttribute("src");
    if (!src) {
      throw new Error("Image src attribute is missing");
    }

    // 画像のロード完了を待つ
    await expect(img).toHaveJSProperty("complete", true);
    const isLoaded = await img.evaluate(
      (el: HTMLImageElement) => el.naturalWidth > 0,
    );
    expect(isLoaded).toBe(true);

    return src;
  };

  const clickButton = async (page: Page) => {
    const button = page.getByRole("button", { name: "One more cat" });
    await expect(button).toBeVisible();
    await button.click();
  };

  test("should render image on home page", async ({ page }, testInfo) => {
    try {
      await checkImage(page);
    } catch (error) {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
      });
      throw error;
    }
  });

  test("should change image on home page", async ({ page }, testInfo) => {
    try {
      const src1 = await checkImage(page);
      await clickButton(page);
      const src2 = await checkImage(page);
      expect(src1).not.toBe(src2);
    } catch (error) {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
      });
      throw error;
    }
  });
});
