#!/usr/bin/env bash
# run prettier for changes files only
FILES=$(git status | grep -Eo "(\.\./)?(src|shared).*\.((t|j)sx?|s?css)" | xargs)

yarn prettier $FILES
