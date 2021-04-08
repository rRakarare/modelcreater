import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

export function save(blob, filename) {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

  }


export function exportdata(ref, filename) {
    const exporter = new GLTFExporter();
    const options = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: false,
      maxTextureSize: Number(4096) || Infinity // To prevent NaN value
    };
    exporter.parse(
        ref.current,
        function (result) {
            const output = JSON.stringify(result, null, 2);
            save(new Blob([output], { type: "text/plain" }), filename);      
        },
        options
      );
    };