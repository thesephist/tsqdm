all: watch

# check & run main.ts
run: check
	deno run --allow-all main.ts

# typecheck
check:
	deno check main.ts
ck: check

# typecheck all files (not just those reachable from the entrypoint)
check-all:
	deno check *.ts **/*.ts

# check and run whenever sources change
watch:
	ls *.ts src/*.ts | entr -crn make run
w: watch

# format changed Oak source
fmt:
	deno fmt *.ts **/*.ts
f: fmt

