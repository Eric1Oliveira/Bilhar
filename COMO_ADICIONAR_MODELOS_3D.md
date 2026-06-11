# Como Adicionar Novos Modelos 3D

## Formatos suportados
- `.glb` — para visualização 3D web (Three.js)
- `.usdz` — para AR no iOS (gerado a partir do .glb)

## Passo a passo

### 1. Preparar o modelo GLB
Use Blender, 3ds Max, Maya ou Sketchup para criar/exportar o modelo.
- Escala: 1 unidade = 1 metro
- Eixo Y para cima
- Centro na base da mesa
- Nomes de materials: `wood_material`, `felt_material`, `leg_material`

### 2. Colocar os arquivos
```
public/
  models/
    mesa-sinuca.glb         ← modelo base padrão
    mesa-pro9.glb           ← novo modelo
    mesa-pro9.usdz          ← versão iOS AR
  textures/
    felt_verde.jpg
    felt_azul.jpg
    wood_nogueira.jpg
    ...
```

### 3. Registrar no banco Supabase
```sql
UPDATE products SET
  model_3d_url = '/models/mesa-pro9.glb',
  ar_model_url = '/models/mesa-pro9.usdz'
WHERE slug = 'pro-9-standard';
```

### 4. Atualizar o componente 3D
Em `components/three/billiard-table.tsx`, adicione suporte a GLB via useGLTF:

```tsx
import { useGLTF } from "@react-three/drei";

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
```

### 5. Aplicar materiais dinâmicos ao GLB
```tsx
useEffect(() => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name.includes("wood")) {
        child.material = woodMat;
      } else if (child.name.includes("felt")) {
        child.material = feltMat;
      }
    }
  });
}, [scene, woodMat, feltMat]);
```

### 6. Converter .glb para .usdz (para iOS)
Use o Reality Converter da Apple (Mac) ou:
```bash
# Via npm package
npx @google/model-viewer --usdz output.usdz input.glb
```

## Convenções de nomenclatura de materials no Blender
- `Material_Wood` → afetado pela cor de madeira
- `Material_Felt` → afetado pela cor do feltro
- `Material_Leg` → afetado pelo tipo de perna
- `Material_Metal` → cromado fixo
