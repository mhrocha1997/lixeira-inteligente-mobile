import api from "./api";

export async function addDiscard(
	token: string,
	userId: string,
	productId: string
) {
	const body = {
		userId,
		productId,
	};
	const response = await api.post("/inventory", body, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status == 201) {
		return true;
	}
	return false;
}

export async function getInventory(token: string, userId: string) {
	const url = `/inventory/${userId}`;

	const response = await api.get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

    if (response.status == 200){
        return response.data.inventory;
    }else{
        return [];
    }

}
