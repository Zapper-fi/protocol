import { usePrivy } from '@privy-io/react-auth';

export function Debug() {
	const { authenticated, user } = usePrivy();

	return (
		<div className="mb-8">
			<details>
				<summary>Debug</summary>

				<textarea
					rows={10}
					className="w-full"
					value={JSON.stringify(user, null, 2)}
				/>
			</details>
		</div>
	);
}
