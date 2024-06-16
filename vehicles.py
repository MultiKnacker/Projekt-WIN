# Assuming vehicles._id is a list or similar iterable
vehicles = type('Vehicles', (object,), {'_id': list(range(100))})()

for i in range(0, len(vehicles._id), 5):
    if i + 4 < len(vehicles._id):
        print(f"[vehicles[{i}]._id,vehicles[{i+1}]._id,vehicles[{i+2}]._id,vehicles[{i+3}]._id,vehicles[{i+4}]._id]")
