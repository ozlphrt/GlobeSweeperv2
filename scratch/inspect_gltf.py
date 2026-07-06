import json
import os

gltf_path = r"C:\Users\ozalp\Code\GlobeSweeperv2\low_poly_golf_flag_animated\scene.gltf"

if os.path.exists(gltf_path):
    with open(gltf_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    accessors = data.get('accessors', [])
    animations = data.get('animations', [])
    print(f"Animations: {len(animations)}")
    for a_idx, anim in enumerate(animations):
        channels = anim.get('channels', [])
        samplers = anim.get('samplers', [])
        print(f"  Animation {a_idx}: {anim.get('name', 'unnamed')}")
        print(f"    Channels: {len(channels)}")
        print(f"    Samplers: {len(samplers)}")
        
        # Let's see the total keyframes
        total_keyframes = 0
        for s in samplers:
            input_acc_idx = s.get('input')
            input_acc = accessors[input_acc_idx]
            total_keyframes += input_acc.get('count', 0)
        print(f"    Total keyframes across samplers: {total_keyframes}")
else:
    print("GLTF path does not exist.")
