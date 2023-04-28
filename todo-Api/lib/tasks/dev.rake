public # public methods

namespace :dev do
    desc 'Configure development environment'
    task setup: :environment do
        sppiner("Dropping old database") do
            %x(rails db:drop)
        end
        sppiner("Creating a new database") do
            %x(rails db:create)
        end
        sppiner("Running migrations") do
            %x(rails db:migrate)
        end
         sppiner("Seeding database") do
            %x(rails db:seed)
        end
        %x(rails dev:add_example_tasks)
        puts "The development environment has been set up!"
    end

    desc 'Generating example tasks with Faker'
    task add_example_tasks: :environment do
        sppiner("Generating example tasks") do
            rand(1..20).times do
                Todo.create!(
                    name: Faker::Lorem.sentence(word_count: 3),
                    description: Faker::Lorem.paragraph(sentence_count: 3),
                    status: Faker::Boolean.boolean
                )
            end
        end

        puts "Example tasks have been generated!"
    end

    desc 'Resetting the database'
    task reset: :environment do
        sppiner("Dropping old database") do
            %x(rails db:drop)
        end
        sppiner("Creating a new empty database") do
            %x(rails db:create)
        end
        sppiner("Running migrations") do
            %x(rails db:migrate)
        end
        sppiner("Seeding database") do
            %x(rails db:seed)
        end
        puts "The database has been reset!"
    end
end

private # private methods

    def sppiner(msg_toStart, msg_toEnd = "✔")
        spinner = TTY::Spinner.new("[:spinner] #{msg_toStart}")
        spinner.auto_spin
        yield
        spinner.success("#{msg_toEnd}")
    end